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

    const venues = fields.map(field => {
      const venue = field.venue;

      const prices = field.availableHours.map(hour => hour.pricePerHour);
      const minPrice = prices.length > 0 ? Math.min(...prices) : undefined;

      const hours = field.availableHours.filter(hour => hour.isAvailable).map(hour => hour.hour);
      const smallestHour = hours.length > 0 ? Math.min(...hours) : null;
      const highestHour = hours.length > 0 ? Math.max(...hours) : null;
      const openHours = `${smallestHour}.00 - ${highestHour}.00`;

      const isIndoor = field.isIndoor;
      const isOutdoor = !field.isIndoor;
      const indoorOutdoor = isIndoor && isOutdoor ? 'Both' : isIndoor ? 'Indoor' : 'Outdoor';

      const totalRatings = venue.reviews.reduce((acc, review) => acc + review.rating, 0);
      const ratingAvg =
        venue.reviews.length > 0 ? parseFloat((totalRatings / venue.reviews.length).toFixed(1)) : 0;
      const reviewCount = venue.reviews.length;

      return {
        id: venue.id,
        name: venue.name,
        images: venue.images,
        minPrice,
        openHours,
        isIndoor: indoorOutdoor,
        location: venue.location,
        ratingAvg,
        reviewCount,
      };
    });

    return venues;
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

    const venues = fields.map(field => {
      const venue = field.venue;

      const prices = field.availableHours.map(hour => hour.pricePerHour);
      const minPrice = prices.length > 0 ? Math.min(...prices) : undefined;

      const hours = field.availableHours.filter(hour => hour.isAvailable).map(hour => hour.hour);
      const smallestHour = hours.length > 0 ? Math.min(...hours) : null;
      const highestHour = hours.length > 0 ? Math.max(...hours) : null;
      const openHours = `${smallestHour}.00 - ${highestHour}.00`;

      const isIndoor = field.isIndoor;
      const isOutdoor = !field.isIndoor;
      const indoorOutdoor = isIndoor && isOutdoor ? 'Both' : isIndoor ? 'Indoor' : 'Outdoor';

      const totalRatings = venue.reviews.reduce((acc, review) => acc + review.rating, 0);
      const ratingAvg =
        venue.reviews.length > 0 ? parseFloat((totalRatings / venue.reviews.length).toFixed(1)) : 0;
      const reviewCount = venue.reviews.length;

      const distance = getDistanceFromLatLonInKm(
        latitude,
        longitude,
        venue.location.latitude,
        venue.location.longitude
      );

      return {
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
      };
    });

    const sortedVenues = venues.sort((a, b) => a.distance - b.distance);

    console.log('sortedVenues', sortedVenues);

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

    const venues = fields.map(field => {
      const venue = field.venue;

      const prices = field.availableHours.map(hour => hour.pricePerHour);
      const minPrice = prices.length > 0 ? Math.min(...prices) : undefined;

      const hours = field.availableHours.filter(hour => hour.isAvailable).map(hour => hour.hour);
      const smallestHour = hours.length > 0 ? Math.min(...hours) : null;
      const highestHour = hours.length > 0 ? Math.max(...hours) : null;
      const openHours = `${smallestHour}.00 - ${highestHour}.00`;

      const isIndoor = field.isIndoor;
      const isOutdoor = !field.isIndoor;
      const indoorOutdoor = isIndoor && isOutdoor ? 'Both' : isIndoor ? 'Indoor' : 'Outdoor';

      const totalRatings = venue.reviews.reduce((acc, review) => acc + review.rating, 0);
      const ratingAvg =
        venue.reviews.length > 0 ? parseFloat((totalRatings / venue.reviews.length).toFixed(1)) : 0;
      const reviewCount = venue.reviews.length;

      return {
        id: venue.id,
        name: venue.name,
        images: venue.images,
        minPrice,
        openHours,
        isIndoor: indoorOutdoor,
        location: venue.location,
        ratingAvg,
        reviewCount,
      };
    });

    const sortedVenues = venues.sort((a, b) => b.ratingAvg - a.ratingAvg);

    return sortedVenues;
  } catch (error) {
    console.error('Error in getHighestRatingVenues', error);
    throw new Error('Error in getHighestRatingVenues. Please try again later.');
  }
}

export async function getInfiniteVenues({pageParam = 0, pageSize = 4}) {
  try {
    const skip = pageParam * pageSize;

    const response = await prisma.venue.findMany({
      skip,
      take: pageSize,
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
      response.map(async venue => {
        const prices = venue.fields.flatMap(field =>
          field.availableHours.map(hour => hour.pricePerHour)
        );

        const minPrice = prices.length > 0 ? Math.min(...prices) : undefined;

        const hours = venue.fields.flatMap(field =>
          field.availableHours.filter(hour => hour.isAvailable).map(hour => hour.hour)
        );
        const smallestHour = hours.length > 0 ? Math.min(...hours) : null;
        const highestHour = hours.length > 0 ? Math.max(...hours) : null;
        const openHours = `${smallestHour}.00 - ${highestHour}.00`;

        const isIndoor = venue.fields.some(field => field.isIndoor);
        const isOutdoor = venue.fields.some(field => !field.isIndoor);
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

        return {
          id: venue.id,
          name: venue.name,
          images: venue.images,
          minPrice: venue.minPrice,
          openHours: venue.openHours,
          isIndoor: venue.isIndoor,
          location: venue.location,
          ratingAvg: venue.ratingAvg,
          reviewCount: venue.reviewCount,
        };
      })
    );

    const totalVenues = await prisma.venue.count();
    const hasMore = skip + response.length < totalVenues;

    return {
      data: venuesWithDetails,
      nextPage: hasMore ? pageParam + 1 : undefined,
    };
  } catch (error) {
    console.error('Error in getAllVenues', error);
    throw new Error('Error in getAllVenues. Please try again later.');
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
            availableHours: true,
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

      const availableHour = field.availableHours.find(
        hour => hour.hour === booking.startTime.getHours() && hour.isAvailable
      );

      if (!availableHour) {
        throw new Error(`Field ${booking.fieldId} is not available at ${booking.startTime}`);
      }

      bookingData.push({
        venueId,
        fieldId: booking.fieldId,
        userId,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        price: booking.price,
      });
    }

    await prisma.booking.deleteMany({
      where: {
        date: {
          lte: today,
        },
        status: 'PENDING',
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
