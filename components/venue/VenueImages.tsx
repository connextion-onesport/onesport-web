'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {AspectRatio} from '../ui/aspect-ratio';
import {Button} from '../ui/button';
import {useCallback, useEffect, useRef, useState} from 'react';
import {VisuallyHidden} from '@radix-ui/react-visually-hidden';
import {Carousel, CarouselContent, CarouselItem} from '@/components/ui/carousel';
import {useVenueStore} from '@/providers/zustand-provider';
import {Skeleton} from '../ui/skeleton';
import {PiImages} from 'react-icons/pi';

interface VenueImagesProps {
  data: any
}

export default function VenueImages({data}: VenueImagesProps) {
  const {showImages, setShowImages} = useVenueStore(state => state);

  const images = data.images;
  const imageCount = images.length;

  const mainImage = images[0].image;
  const venueImages = images.slice(1);

  return (
    <section
      className={`${imageCount > 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} grid md:gap-2`}
    >
      <VenueMainImage image={mainImage} imageCount={imageCount} setShowImages={setShowImages} />

      {imageCount > 2 && (
        <div
          className={`grid gap-2 ${imageCount === 5 || imageCount > 5 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-1'}`}
        >
          {venueImages
            .slice(0, imageCount > 5 ? 4 : imageCount === 4 ? 2 : venueImages.length)
            .map((venue: {id: string; image: string}, index: number) => (
              <VenueImage
                key={venue.id}
                image={venue.image}
                setShowImages={setShowImages}
                isLast={
                  (imageCount > 2 && imageCount < 5 && index === 1) ||
                  (imageCount > 4 && index === 3)
                }
              />
            ))}
        </div>
      )}

      <VenueImageDialog
        data={data}
        imageCount={imageCount}
        showImages={showImages}
        setShowImages={setShowImages}
      />
    </section>
  );
}

interface VenueMainImageProps {
  image: string;
  imageCount: number;
  setShowImages: (value: boolean) => void;
}

function VenueMainImage({image, imageCount, setShowImages}: VenueMainImageProps) {
  return (
    <div
      className="relative flex h-full shrink-0 grow-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg"
      onClick={() => setShowImages(true)}
    >
      <div
        className={`${imageCount > 2 ? 'aspect-[3/2]' : 'aspect-[16/9] md:aspect-[21/9]'} relative w-full overflow-hidden rounded-lg`}
      >
        <Image src={image} alt="Main Venue Image" fill className="object-cover" />
      </div>

      <div
        className={`${imageCount < 3 ? 'block' : 'md:hidden'} absolute bottom-4 right-4 cursor-pointer`}
      >
        <div className="flex h-9 items-center gap-2 rounded-lg bg-black/50 px-4 py-2">
          <PiImages className="h-6 w-6 text-white" />
          <p className="text-xs font-semibold text-white">Lihat Semua</p>
        </div>
      </div>
    </div>
  );
}

interface VenueImageProps {
  image: string;
  isLast?: boolean;
  setShowImages: (value: boolean) => void;
}

function VenueImage({image, setShowImages, isLast}: VenueImageProps) {
  return (
    <div
      className={`${isLast ? 'bg-primary/10' : 'shrink-0 grow-0 cursor-pointer'} relative hidden h-full cursor-pointer items-center justify-center overflow-hidden rounded-lg md:flex`}
      onClick={() => setShowImages(true)}
    >
      <Image src={image} alt="Venue Image" fill className="rounded-lg object-cover" />

      {isLast && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
          <div className="flex items-center justify-center gap-2">
            <PiImages className="h-6 w-6 text-white" />
            <p className="text-xs font-semibold text-white sm:text-sm md:text-base">Lihat Semua</p>
          </div>
        </div>
      )}
    </div>
  );
}

interface VenueImageDialogProps {
  data: any;
  imageCount: number;
  showImages: boolean;
  setShowImages: (value: boolean) => void;
}

function VenueImageDialog({data, imageCount, showImages, setShowImages}: VenueImageDialogProps) {
  const name = data.name
  const description = data.description
  const images = data.images;

  return (
    <Dialog open={showImages} onOpenChange={setShowImages}>
      <DialogContent className="flex h-dvh flex-col items-center justify-center gap-0 rounded-none p-0 md:h-fit md:max-w-5xl md:rounded-xl">
        <DialogHeader className="w-full border-b-2 p-6">
          <DialogTitle className='line-clamp-1'>{name}</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>{description}</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>

        <VenueCarousel venues={images} imageCount={imageCount} />
      </DialogContent>
    </Dialog>
  );
}

interface VenueCarouselProps {
  venues: any;
  imageCount: number;
}

function VenueCarousel({venues, imageCount}: VenueCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<any>();
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!api) return;

      api.scrollTo(index);
      const thumbnailsContainer = thumbnailsRef.current;
      if (thumbnailsContainer) {
        const thumbnail = thumbnailsContainer.children[index];
        if (thumbnail) {
          thumbnail.scrollIntoView({behavior: 'smooth', inline: 'center'});
        }
      }
    },
    [api]
  );

  return (
    <div className="my-auto flex w-full flex-col gap-8 rounded-none bg-background px-6 py-10">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {venues.map((venue: {id: string; image: string; name: string}) => (
            <CarouselItem key={venue.id} className="w-full">
              <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
                <Image src={venue.image} alt={venue.name} fill className="object-cover" />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {imageCount > 1 && (
        <div
          ref={thumbnailsRef}
          className="flex items-center justify-center gap-2 overflow-hidden p-1"
        >
          {venues.map((venue: {id: string; image: string; name: string}, index: number) => (
            <VenueCarouselButton
              key={venue.id}
              image={venue.image}
              isSelected={currentIndex === index}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface VenueCarouselButtonProps {
  image: string;
  isSelected: boolean;
  onClick: () => void;
}

function VenueCarouselButton({image, isSelected, onClick}: VenueCarouselButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={`relative flex aspect-square h-full min-h-24 shrink-0 grow-0 items-center justify-center overflow-hidden rounded-lg bg-primary/10 transition-transform ${
        isSelected ? 'scale-105 border-2 border-primary' : 'border-transparent'
      }`}
    >
      <Image src={image} alt="Thumbnail Image" fill className="object-cover" />
    </Button>
  );
}

export function VenueImagesSkeleton() {
  return (
    <section className="grid grid-cols-1 gap-2 md:grid-cols-2">
      <AspectRatio ratio={3 / 2}>
        <Skeleton className="h-full w-full rounded-lg" />
      </AspectRatio>
      <div className="grid grid-cols-4 gap-2 md:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <AspectRatio key={index} ratio={3 / 2}>
            <Skeleton className="h-full w-full rounded-lg" />
          </AspectRatio>
        ))}
      </div>
    </section>
  );
}
