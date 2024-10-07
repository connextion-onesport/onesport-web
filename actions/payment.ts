'use server';

import {prisma} from '@/libs/prisma';
import {paymentFormSchema} from '@/libs/validators';
import {splitFullName} from '@/libs/utils';
import {z} from 'zod';
import {min} from 'date-fns';

const midtransClient = require('midtrans-client');

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

interface PaymentParameter {
  bookingId: string[];
  values: z.infer<typeof paymentFormSchema>;
}

interface ItemDetail {
  id: string;
  price: number;
  quantity: number;
  name: string;
  category: string;
  merchant_name: string;
  url: string;
}

export async function createPayment({bookingId, values}: PaymentParameter) {
  try {
    const {name, email, phone, isSelf, otherName} = await paymentFormSchema.parseAsync(values);

    const today = new Date();
    const order_id = `ONESPORT-${new Date().toISOString().replace(/[-:T.]/g, '')}`;

    const bookings = await prisma.booking.findMany({
      where: {
        id: {in: bookingId},
      },
      include: {
        venue: true,
        field: {
          include: {
            category: true,
          },
        },
        user: true,
      },
    });

    if (!bookings || bookings.length === 0) throw new Error('Booking not found');

    const user = bookings[0].user;
    const venue = bookings[0].venue;

    if (!user) throw new Error('User not found');

    const {firstName, lastName} = splitFullName(user.name || '');

    if (isSelf) {
      await prisma.user.update({
        where: {id: user.id},
        data: {phone},
      });
    }

    const price = bookings.map((booking: any) => booking.price);
    const rentPrice = price.reduce((acc: number, curr: number) => acc + curr, 0);
    const serviceFee = 10000;
    const tax = (rentPrice + serviceFee) * 0.11;
    const totalServicePrice = serviceFee + tax;
    const totalPrice = rentPrice + totalServicePrice;

    const service_id = `SERVICEFEE-${new Date().toISOString().replace(/[-:T.]/g, '')}`;

    const itemDetails = bookings.map(booking => ({
      id: booking.id,
      price: booking.price,
      quantity: 1,
      name: booking.field.name,
      category: booking.field.category.name,
      merchant_name: 'ONESPORT',
      url: `http://localhost:3000/venues/${booking.venueId}`,
    }));

    const serviceItem = {
      id: service_id,
      price: totalServicePrice,
      quantity: 1,
      name: `Service Fee`,
      category: 'Service',
      merchant_name: 'ONESPORT',
      url: 'http://localhost:3000',
    };

    const items = [...itemDetails, serviceItem];

    const payment = await prisma.payment.create({
      data: {
        orderId: order_id,
        amount: totalPrice,
        currency: 'IDR',
        date: new Date(),
        status: 'PENDING',
        expiryTime: new Date(today.getTime() + 60 * 60000),
      },
    });

    const paymentToken = await snap.createTransactionToken({
      transaction_details: {
        order_id,
        gross_amount: totalPrice,
      },
      item_details: items,
      customer_details: {
        first_name: firstName,
        last_name: lastName,
        email: user.email,
        phone: user.phone,
      },
      expiry: {
        unit: 'minutes',
        duration: 60,
      },
      callbacks: {
        finish: `http://localhost:3000/booking/status/${payment.id}`,
        error: `http://localhost:3000/booking/status/${payment.id}`,
      },
    });

    await prisma.payment.update({
      where: {id: payment.id},
      data: {
        token: paymentToken,
      },
    });

    await prisma.payment.deleteMany({
      where: {
        date: {
          lte: today,
        },
        status: {in: ['PENDING', 'FAILED']},
      },
    });

    await prisma.booking.updateMany({
      where: {id: {in: bookingId}},
      data: {
        paymentId: payment.id,
        name: isSelf ? name : otherName,
        email,
        phone,
        isSelf,
      },
    });

    return paymentToken;
  } catch (error) {
    console.error('Error in createPayment:', error);
    throw new Error('Failed to create payment. Please try again later.');
  }
}

export async function getPaymentToken({id}: {id: string}) {
  try {
    if (!id) {
      throw new Error('User ID is required');
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        bookings: {
          include: {
            payment: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const payment = user.bookings[0].payment;

    if (!payment) {
      throw new Error('Payment not found');
    }

    return payment.token;
  } catch (error) {
    console.error('Error in getPayment:', error);
    throw new Error('Failed to get payment. Please try again later.');
  }
}

interface GetBookingPriceProps {
  id: string;
}

export async function getBookingPrice({id}: GetBookingPriceProps) {
  try {
    if (!id) {
      throw new Error('User ID is required');
    }

    const user = await prisma.user.findUnique({
      where: {id},
      include: {
        bookings: {
          include: {
            venue: true,
            field: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const prices = user.bookings.map(booking => booking.price);
    const rentPrice = prices.reduce((acc, curr) => acc + curr, 0);
    const SERVICE_FEE = 10000;
    const TAX_RATE = 0.11;
    const tax = (rentPrice + SERVICE_FEE) * TAX_RATE;
    const totalPrice = rentPrice + SERVICE_FEE + tax;

    return {
      rentPrice,
      serviceFee: SERVICE_FEE,
      tax,
      totalPrice,
    };
  } catch (error) {
    console.error('Error in getBookingPrice:', error);
    throw new Error('Failed to get booking price. Please try again later.');
  }
}

export async function deleteBooking(bookingId: string) {
  try {
    const booking = await prisma.booking.findUnique({
      where: {id: bookingId},
    });

    if (!booking) {
      throw new Error('Booking not found');
    }

    await prisma.booking.delete({
      where: {id: bookingId},
    });

    return booking;
  } catch (error) {
    console.error('Error in deleteBooking:', error);
    throw new Error('Failed to delete booking. Please try again later.');
  }
}

export async function getAllBookingFields(id: string) {
  try {
    if (!id) {
      throw new Error('User ID is required');
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        bookings: {
          include: {
            venue: true,
            field: true,
            user: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const bookings = await Promise.all(
      user.bookings.map(async booking => {
        if (booking.status !== 'PENDING') {
          return null;
        }

        const venue = await prisma.venue.findUnique({
          where: {
            id: user.bookings[0].venueId,
          },
          include: {
            location: true,
          },
        });

        if (!venue) {
          throw new Error('Venue not found');
        }

        const field = await prisma.field.findUnique({
          where: {
            id: booking.fieldId,
          },
          include: {
            category: true,
            images: true,
          },
        });

        if (!field) {
          throw new Error('Field not found');
        }

        return {
          id: booking.id,
          date: booking.date,
          startTime: booking.startTime,
          endTime: booking.endTime,
          price: booking.price,
          status: booking.status,
          venue: {
            id: venue.id,
            name: venue.name,
            ratingAvg: venue.ratingAvg,
            reviewCount: venue.reviewCount,
            location: venue.location,
          },
          field: {
            id: field.id,
            name: field.name,
            category: field.category,
            images: field.images,
            isIndoor: field.isIndoor,
          },
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
          },
        };
      })
    );

    return bookings;
  } catch (error) {
    console.error('Error in getAllBookingVenues', error);
    throw new Error('Error in getAllBookingVenues. Please try again later.');
  }
}

export async function getPaymentStatus({id}: {id: string}) {
  try {
    const response = await prisma.payment.findUnique({
      where: {id},
      include: {
        bookings: {
          include: {
            venue: true,
            field: true,
            user: true,
          },
        },
      },
    });

    if (!response) {
      throw new Error('Payment not found');
    }

    const bookings = await Promise.all(
      response.bookings.map(async booking => {
        if (booking.status !== 'PENDING') {
          return null;
        }

        const venue = await prisma.venue.findUnique({
          where: {
            id: booking.venueId,
          },
          include: {
            location: true,
          },
        });

        if (!venue) {
          throw new Error('Venue not found');
        }

        const field = await prisma.field.findUnique({
          where: {
            id: booking.fieldId,
          },
          include: {
            category: true,
            images: true,
          },
        });

        if (!field) {
          throw new Error('Field not found');
        }

        return {
          id: booking.id,
          date: booking.date,
          startTime: booking.startTime,
          endTime: booking.endTime,
          price: booking.price,
          status: booking.status,
          venue: {
            id: venue.id,
            name: venue.name,
            ratingAvg: venue.ratingAvg,
            reviewCount: venue.reviewCount,
            location: venue.location,
          },
          field: {
            id: field.id,
            name: field.name,
            category: field.category,
            images: field.images,
            isIndoor: field.isIndoor,
          },
          user: {
            id: booking.userId,
            name: booking.name,
            email: booking.email,
            phone: booking.phone,
          },
        };
      })
    );

    return {
      id: response.id,
      orderId: response.orderId,
      amount: response.amount,
      currency: response.currency,
      token: response.token,
      date: response.date,
      status: response.status,
      expiryTime: response.expiryTime,
      bookings: bookings,
    };
  } catch (error) {
    console.error('Error in getPaymentStatus:', error);
    throw new Error('Failed to get payment status. Please try again later.');
  }
}

interface UpdatePaymentStatusProps {
  id: string;
  status: 'FAILED' | 'PENDING' | 'SUCCESS' | 'REFUNDED';
}

export async function updatePaymentStatus({id, status}: UpdatePaymentStatusProps) {
  try {
    const response = await prisma.payment.update({
      where: {id},
      data: {status},
    });

    return response;
  } catch (error) {
    console.error('Error in updatePaymentStatus:', error);
    throw new Error('Failed to update payment status. Please try again later.');
  }
}

export async function getUserVenues({id, status}: {id: string; status?: string}) {
  try {
    if (!id) {
      throw new Error('User ID is required');
    }

    const user = await prisma.user.findUnique({
      where: {id},
      include: {
        bookings: {
          include: {
            venue: {
              include: {
                images: true,
                location: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const bookings = user.bookings.filter(booking => {
      if (status === 'ALL') return true;
      return booking.status === status;
    });

    if (!bookings || bookings.length === 0) {
      return [];
    }

    const venues = bookings.map(booking => {
      const venue = booking.venue;

      return {
        id: venue.id,
        name: venue.name,
        images: venue.images,
        minPrice: venue.minPrice,
        openHours: venue.openHours,
        location: venue.location,
        ratingAvg: venue.ratingAvg,
        reviewCount: venue.reviewCount,
        status: booking.status,
        paymentId: booking.paymentId,
      };
    });

    return venues;
  } catch (error) {
    console.error('Error in getUserVenues:', error);
    throw new Error('Failed to get user venues. Please try again later.');
  }
}
