'use client'

import {fieldImages} from '@/libs/constants';
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

interface VenueImagesProps {
  venues: any
}

export default function VenueImages({venues}: VenueImagesProps) {
  const {showImages, setShowImages} = useVenueStore(state => state);
  const imageCount = venues.length;

  return (
    <section className="grid grid-cols-1 gap-2 md:grid-cols-2">
      <VenueImage venue={venues} setShowImages={setShowImages} />
      <div className="grid grid-cols-4 gap-2 md:grid-cols-2">
        {venues.map((venue: { id: string; image: string }) => (
          <VenueImage
            key={venue.id}
            venue={venue.image}
            setShowImages={setShowImages}
            isLast={imageCount > 4 &&venue === venues[imageCount - 1]}
          />
        ))}
      </div>

      <VenueImageDialog
        showImages={showImages}
        setShowImages={setShowImages}
        venues={venues}
      />
    </section>
  );
}

interface VenueImageProps {
  venue: any;
  isLast?: boolean;
  setShowImages: (value: boolean) => void;
}

function VenueImage({venue, setShowImages, isLast}: VenueImageProps) {
  return (
    <div
      className={`${isLast ? 'relative bg-primary/10' : 'shrink-0 grow-0 cursor-pointer'} flex h-full cursor-pointer items-center justify-center overflow-hidden rounded-lg`}
      onClick={() => setShowImages(true)}
    >
      <AspectRatio ratio={3 / 2} className="overflow-hidden rounded-lg">
        <Image
          src={venue.image[0]}
          alt="Main Venue Image"
          fill
          className="object-cover"
        />
      </AspectRatio>

      {isLast && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs font-semibold text-white sm:text-sm md:text-base">Lihat Semua</p>
          </div>
        </div>
      )}
    </div>
  );
}

interface VenueImageDialogProps {
  venues: any
  showImages: boolean;
  setShowImages: (value: boolean) => void;
}

function VenueImageDialog({venues, showImages, setShowImages}: VenueImageDialogProps) {
  return (
    <Dialog open={showImages} onOpenChange={setShowImages}>
      <DialogContent className="flex h-dvh flex-col items-center justify-center gap-0 rounded-none p-0 md:h-fit md:max-w-5xl md:rounded-xl">
        <DialogHeader className="w-full border-b-2 p-6">
          <DialogTitle>Lapangan Generasi Baru</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Lapangan Generasi Baru</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>

        <VenueCarousel venues={venues} />
      </DialogContent>
    </Dialog>
  );
}

interface VenueCarouselProps {
  venues: any;
}

function VenueCarousel({venues}: VenueCarouselProps) {
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
          {venues.map((venue: { id: string; image: string; name: string }) => (
            <CarouselItem key={venue.id} className="w-full">
              <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
                <Image
                  src={venue.image}
                  alt={venue.name}
                  fill
                  className="object-cover"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Thumbnail Navigation */}
      <div ref={thumbnailsRef} className="flex gap-2 overflow-hidden p-1 items-center justify-center">
        {venues.map((venue: { id: string; image: string; name: string }, index: number) => (
          <VenueCarouselButton
            key={venue.id}
            image={venue.image}
            isSelected={currentIndex === index}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
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
