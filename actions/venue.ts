'use server';

import {prisma} from '@/libs/prisma';
import {getDistanceFromLatLonInKm} from '@/libs/utils';

export async function getAllVenues({amount = 4, category}: {amount?: number; category?: string}) {
  try {
    const fields = await prisma.field.findMany({
      where: {
        category: {
          name: category,
        },
      },
      include: {
        availableHours: {
          include: {
            bookings: true,
          },
        },
        venue: {
          include: {
            images: true,
            location: true,
            reviews: true,
          },
        },
      },
      take: amount,
    });

    const venueMap = new Map();

    await Promise.all(
      fields.map(async field => {
        const venue = field.venue;

        if (!venueMap.has(venue.id)) {
          const prices = field.availableHours.map(hour => hour.pricePerHour);
          const minPrice = prices.length > 0 ? Math.min(...prices) : undefined;

          const hours = field.availableHours.map(hour => hour.hour);
          const smallestHour = hours.length > 0 ? Math.min(...hours) : null;
          const highestHour = hours.length > 0 ? Math.max(...hours) : null;
          const openHours = `${smallestHour}.00 - ${highestHour}.00`;

          const isIndoor = field.isIndoor;
          const isOutdoor = !field.isIndoor;
          const indoorOutdoor = isIndoor && isOutdoor ? 'Both' : isIndoor ? 'Indoor' : 'Outdoor';

          const totalRatings = venue.reviews.reduce((acc, review) => acc + review.rating, 0);
          const ratingAvg =
            venue.reviews.length > 0
              ? parseFloat((totalRatings / venue.reviews.length).toFixed(1))
              : 0;
          const reviewCount = venue.reviews.length;

          if (openHours !== venue.openHours) {
            await prisma.venue.update({
              where: {
                id: venue.id,
              },
              data: {
                openHours: `${smallestHour}.00 - ${highestHour}.00`,
              },
            });
          }

          if (indoorOutdoor !== venue.isIndoor) {
            await prisma.venue.update({
              where: {
                id: venue.id,
              },
              data: {
                isIndoor: indoorOutdoor,
              },
            });
          }

          if (minPrice !== venue.minPrice) {
            await prisma.venue.update({
              where: {
                id: venue.id,
              },
              data: {
                minPrice: minPrice !== undefined ? minPrice : undefined,
              },
            });
          }

          if (ratingAvg !== venue.ratingAvg) {
            await prisma.venue.update({
              where: {
                id: venue.id,
              },
              data: {
                ratingAvg,
              },
            });
          }

          if (reviewCount !== venue.reviewCount) {
            await prisma.venue.update({
              where: {
                id: venue.id,
              },
              data: {
                reviewCount,
              },
            });
          }

          venueMap.set(venue.id, {
            id: venue.id,
            name: venue.name,
            images: venue.images,
            minPrice,
            openHours,
            isIndoor: indoorOutdoor,
            location: venue.location,
            ratingAvg,
            reviewCount,
          });
        }
      })
    );

    const uniqueVenues = Array.from(venueMap.values());

    return uniqueVenues;
  } catch (error) {
    console.error('Error in getAllVenues', error);
    throw new Error('Error in getAllVenues. Please try again later.');
  }
}

export async function getNearestVenues({
  latitude,
  longitude,
  amount = 4,
  category,
}: {
  latitude: number;
  longitude: number;
  amount?: number;
  category?: string;
}) {
  try {
    const fields = await prisma.field.findMany({
      where: {
        category: {
          name: category,
        },
      },
      include: {
        availableHours: true,
        venue: {
          include: {
            images: true,
            location: true,
            reviews: true,
          },
        },
      },
      take: amount,
    });

    const venueMap = new Map();

    await Promise.all(
      fields.map(async field => {
        const venue = field.venue;

        if (!venueMap.has(venue.id)) {
          const prices = field.availableHours.map(hour => hour.pricePerHour);
          const minPrice = prices.length > 0 ? Math.min(...prices) : undefined;

          const hours = field.availableHours.map(hour => hour.hour);
          const smallestHour = hours.length > 0 ? Math.min(...hours) : null;
          const highestHour = hours.length > 0 ? Math.max(...hours) : null;
          const openHours = `${smallestHour}.00 - ${highestHour}.00`;

          const isIndoor = field.isIndoor;
          const isOutdoor = !field.isIndoor;
          const indoorOutdoor = isIndoor && isOutdoor ? 'Both' : isIndoor ? 'Indoor' : 'Outdoor';

          const totalRatings = venue.reviews.reduce((acc, review) => acc + review.rating, 0);
          const ratingAvg =
            venue.reviews.length > 0
              ? parseFloat((totalRatings / venue.reviews.length).toFixed(1))
              : 0;
          const reviewCount = venue.reviews.length;

          const distance = getDistanceFromLatLonInKm(
            latitude,
            longitude,
            venue.location.latitude,
            venue.location.longitude
          );

          if (openHours !== venue.openHours) {
            await prisma.venue.update({
              where: {
                id: venue.id,
              },
              data: {
                openHours: `${smallestHour}.00 - ${highestHour}.00`,
              },
            });
          }

          if (indoorOutdoor !== venue.isIndoor) {
            await prisma.venue.update({
              where: {
                id: venue.id,
              },
              data: {
                isIndoor: indoorOutdoor,
              },
            });
          }

          if (minPrice !== venue.minPrice) {
            await prisma.venue.update({
              where: {
                id: venue.id,
              },
              data: {
                minPrice: minPrice !== undefined ? minPrice : undefined,
              },
            });
          }

          if (ratingAvg !== venue.ratingAvg) {
            await prisma.venue.update({
              where: {
                id: venue.id,
              },
              data: {
                ratingAvg,
              },
            });
          }

          if (reviewCount !== venue.reviewCount) {
            await prisma.venue.update({
              where: {
                id: venue.id,
              },
              data: {
                reviewCount,
              },
            });
          }

          venueMap.set(venue.id, {
            id: venue.id,
            name: venue.name,
            images: venue.images,
            minPrice,
            openHours,
            isIndoor: indoorOutdoor,
            location: venue.location,
            ratingAvg,
            reviewCount,
            distance,
          });
        }

        return null;
      })
    );

    const uniqueVenues = Array.from(venueMap.values());
    const sortedVenues = uniqueVenues.sort((a, b) => a.distance - b.distance);

    return sortedVenues;
  } catch (error) {
    console.error('Error in getNearestVenues', error);
    throw new Error('Error in getNearestVenues. Please try again later.');
  }
}

export async function getHighestRatingVenues({
  amount = 4,
  category,
}: {
  amount?: number;
  category?: string;
}) {
  try {
    const fields = await prisma.field.findMany({
      where: {
        category: {
          name: category,
        },
      },
      include: {
        availableHours: true,
        venue: {
          include: {
            images: true,
            location: true,
            reviews: true,
          },
        },
      },
      take: amount,
    });

    const venueMap = new Map();

    await Promise.all(
      fields.map(async field => {
        const venue = field.venue;

        if (!venueMap.has(venue.id)) {
          const prices = field.availableHours.map(hour => hour.pricePerHour);
          const minPrice = prices.length > 0 ? Math.min(...prices) : undefined;

          const hours = field.availableHours.map(hour => hour.hour);
          const smallestHour = hours.length > 0 ? Math.min(...hours) : null;
          const highestHour = hours.length > 0 ? Math.max(...hours) : null;
          const openHours = `${smallestHour}.00 - ${highestHour}.00`;

          const isIndoor = field.isIndoor;
          const isOutdoor = !field.isIndoor;
          const indoorOutdoor = isIndoor && isOutdoor ? 'Both' : isIndoor ? 'Indoor' : 'Outdoor';

          const totalRatings = venue.reviews.reduce((acc, review) => acc + review.rating, 0);
          const ratingAvg =
            venue.reviews.length > 0
              ? parseFloat((totalRatings / venue.reviews.length).toFixed(1))
              : 0;
          const reviewCount = venue.reviews.length;

          if (openHours !== venue.openHours) {
            await prisma.venue.update({
              where: {
                id: venue.id,
              },
              data: {
                openHours: `${smallestHour}.00 - ${highestHour}.00`,
              },
            });
          }

          if (indoorOutdoor !== venue.isIndoor) {
            await prisma.venue.update({
              where: {
                id: venue.id,
              },
              data: {
                isIndoor: indoorOutdoor,
              },
            });
          }

          if (minPrice !== venue.minPrice) {
            await prisma.venue.update({
              where: {
                id: venue.id,
              },
              data: {
                minPrice: minPrice !== undefined ? minPrice : undefined,
              },
            });
          }

          if (ratingAvg !== venue.ratingAvg) {
            await prisma.venue.update({
              where: {
                id: venue.id,
              },
              data: {
                ratingAvg,
              },
            });
          }

          if (reviewCount !== venue.reviewCount) {
            await prisma.venue.update({
              where: {
                id: venue.id,
              },
              data: {
                reviewCount,
              },
            });
          }

          venueMap.set(venue.id, {
            id: venue.id,
            name: venue.name,
            images: venue.images,
            minPrice,
            openHours,
            isIndoor: indoorOutdoor,
            location: venue.location,
            ratingAvg,
            reviewCount,
          });
        }

        return null;
      })
    );

    const uniqueVenues = Array.from(venueMap.values());
    const sortedVenues = uniqueVenues.sort((a, b) => b.ratingAvg - a.ratingAvg);

    return sortedVenues;
  } catch (error) {
    console.error('Error in getHighestRatingVenues', error);
    throw new Error('Error in getHighestRatingVenues. Please try again later.');
  }
}

interface GetInfiniteVenuesProps {
  pageParam: number;
  pageSize: number;
  search: string;
  order: string;
  category: string;
  min_price: number;
  max_price: number;
  rating: number;
  latitude: number;
  longitude: number;
}

export async function getInfiniteVenues({
  pageParam = 0,
  pageSize = 4,
  search = '',
  order = 'highest-rating',
  category = '',
  min_price = 0,
  max_price = 0,
  rating = 0,
  latitude = 0,
  longitude = 0,
}: GetInfiniteVenuesProps) {
  try {
    const skip = pageParam * pageSize;

    const whereConditions: any = {
      OR: [
        {name: {contains: search, mode: 'insensitive'}},
        {
          OR: [
            {location: {address: {contains: search, mode: 'insensitive'}}},
            {location: {subDistrict: {contains: search, mode: 'insensitive'}}},
            {location: {city: {contains: search, mode: 'insensitive'}}},
          ],
        },
      ],
    };

    if (category) {
      whereConditions.fields = {
        some: {
          category: {
            name: category,
          },
        },
      };
    }

    if (min_price > 0) {
      whereConditions.minPrice = {
        gte: min_price,
      };
    }

    if (max_price > 0) {
      whereConditions.fields = {
        some: {
          availableHours: {
            some: {
              pricePerHour: {
                lte: max_price,
              },
            },
          },
        },
      };
    }

    if (rating > 0) {
      whereConditions.ratingAvg = {
        gte: rating,
      };
    }

    const venues = await prisma.venue.findMany({
      skip,
      take: pageSize,
      where: whereConditions,
      include: {
        fields: {
          include: {
            availableHours: true,
          },
        },
        images: true,
        location: true,
        reviews: true,
      },
    });

    const venuesWithDetails = await Promise.all(
      venues.map(async venue => {
        const prices = venue.fields.flatMap(field =>
          field.availableHours.map(hour => hour.pricePerHour)
        );
        const minPrice = prices.length > 0 ? Math.min(...prices) : undefined;

        const hours = venue.fields.flatMap(field => field.availableHours.map(hour => hour.hour));
        const smallestHour = hours.length > 0 ? Math.min(...hours) : null;
        const highestHour = hours.length > 0 ? Math.max(...hours) : null;
        const openHours = `${smallestHour}.00 - ${highestHour}.00`;

        const totalRatings = venue.reviews.reduce((acc, review) => acc + review.rating, 0);
        const ratingAvg =
          venue.reviews.length > 0
            ? parseFloat((totalRatings / venue.reviews.length).toFixed(1))
            : 0;
        const reviewCount = venue.reviews.length;

        const distance = getDistanceFromLatLonInKm(
          latitude,
          longitude,
          venue.location.latitude,
          venue.location.longitude
        );

        await prisma.venue.update({
          where: {id: venue.id},
          data: {
            openHours: openHours,
            minPrice: minPrice !== undefined ? minPrice : undefined,
            ratingAvg,
            reviewCount,
            distance,
          },
        });

        return {
          id: venue.id,
          name: venue.name,
          images: venue.images,
          minPrice,
          openHours,
          location: venue.location,
          ratingAvg,
          reviewCount,
          distance,
        };
      })
    );

    const sortedVenues = venuesWithDetails.sort((a, b) => {
      switch (order) {
        case 'highest-rating':
          return b.ratingAvg - a.ratingAvg;
        case 'highest-price':
          return (b.minPrice || 0) - (a.minPrice || 0);
        case 'lowest-price':
          return (a.minPrice || 0) - (b.minPrice || 0);
        case 'recommendation':
          return a.distance - b.distance;
        default:
          return 0;
      }
    });

    const totalVenues = await prisma.venue.count();
    const hasMore = skip + venues.length < totalVenues;

    return {
      data: sortedVenues,
      nextPage: hasMore ? pageParam + 1 : undefined,
    };
  } catch (error) {
    console.error('Error in getInfiniteVenues', error);
    throw new Error('Error in getInfiniteVenues. Please try again later.');
  }
}

export async function getVenueById({id}: {id: string}) {
  try {
    if (!id) {
      throw new Error('Venue ID is required');
    }

    const venue = await prisma.venue.findUnique({
      where: {
        id,
      },
      include: {
        fields: {
          include: {
            availableHours: {
              include: {
                bookings: true,
              },
            },
            images: true,
            category: true,
            facilities: {
              include: {
                facility: true,
              },
            },
          },
        },
        facilities: {
          include: {
            facility: true,
          },
        },
        images: true,
        location: true,
        bookings: true,
        reviews: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!venue) {
      throw new Error('Venue not found');
    }

    const facilities = venue.facilities.map(({facility}) => ({
      id: facility.id,
      name: facility.name,
      createdAt: facility.createdAt,
      updatedAt: facility.updatedAt,
    }));

    return {
      id: venue.id,
      name: venue.name,
      description: venue.description,
      images: venue.images,
      minPrice: venue.minPrice,
      openHours: venue.openHours,
      isIndoor: venue.isIndoor,
      fields: venue.fields,
      location: venue.location,
      ratingAvg: venue.ratingAvg,
      reviewCount: venue.reviewCount,
      reviews: venue.reviews,
      facilities,
    };
  } catch (error) {
    console.error('Error in getVenueById', error);
    throw new Error('Error in getVenueById. Please try again later.');
  }
}

interface Booking {
  fieldId: any;
  venueId: any;
  userId: any;
  date: Date;
  startTime: Date;
  endTime: Date;
  price: number;
}

export async function createBookings({
  venueId,
  userId,
  bookings,
}: {
  venueId: string;
  userId: string;
  bookings: Booking[];
}) {
  try {
    const today = new Date();

    const venue = await prisma.venue.findUnique({
      where: {
        id: venueId,
      },
      include: {
        fields: {
          include: {
            availableHours: true,
          },
        },
      },
    });

    if (!venue) {
      throw new Error('Venue not found');
    }

    // Prepare the data for bookings and check availability
    const bookingData = [];

    for (const booking of bookings) {
      const field = venue.fields.find(field => field.id === booking.fieldId);

      if (!field) {
        throw new Error(`Field ${booking.fieldId} not found`);
      }

      const dayOfWeek = ((booking.startTime.getDay() + 6) % 7) + 1;
      const hour = booking.startTime.getHours();

      const availableHour = field.availableHours.find(
        availableHour => availableHour.dayOfWeek === dayOfWeek && availableHour.hour === hour
      );

      if (!availableHour) {
        throw new Error(`Field ${booking.fieldId} is not available at ${booking.startTime}`);
      }

      const bookingsForDate = await prisma.booking.findMany({
        where: {
          fieldId: booking.fieldId,
          date: booking.date,
          status: 'PENDING',
        },
      });

      const bookedHours = bookingsForDate.map(booking => booking.startTime.getHours());

      if (bookedHours.includes(hour)) {
        throw new Error(`Field ${booking.fieldId} is already booked at ${booking.startTime}`);
      }

      bookingData.push({
        venueId,
        fieldId: booking.fieldId,
        userId,
        availableHourId: availableHour.id,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        price: availableHour.pricePerHour,
      });
    }

    await prisma.booking.updateMany({
      where: {
        date: {
          lt: today,
        },
        status: 'PENDING',
      },
      data: {
        status: 'CANCELLED',
      },
    });

    const createdBookings = await prisma.booking.createMany({
      data: bookingData,
    });

    return createdBookings;
  } catch (error) {
    console.error('Error in createBookings', error);
    throw new Error('Error in creating bookings. Please try again later.');
  }
}

export async function getVenueRecommendation({id, category}: {id: string; category: string}) {
  try {
    const venues = await prisma.venue.findMany({
      where: {
        id: {
          not: id,
        },
        fields: {
          some: {
            category: {
              name: category,
            },
          },
        },
      },
      include: {
        fields: {
          include: {
            availableHours: true,
          },
        },
        images: true,
        location: true,
        reviews: true,
      },
    });

    return venues;
  } catch (error) {
    console.error('Error in getVenueRecommendation', error);
    throw new Error('Error in getVenueRecommendation. Please try again later.');
  }
}

export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany();

    return categories;
  } catch (error) {
    console.error('Error in getAllCategories', error);
    throw new Error('Error in getAllCategories. Please try again later.');
  }
}
