import {FilterAll, FilterCategory, FilterOrder, FilterPrice, FilterRating, FilterReset} from './';
import {Carousel, CarouselContent, CarouselItem} from '@/components/ui/carousel';

export default function FilterList() {

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-row gap-4 overflow-hidden">
        <FilterAll />

        <Carousel className="flex overflow-hidden lg:w-full">
          <CarouselContent>
            <CarouselItem className="min-w-fit basis-0">
              <FilterOrder />
            </CarouselItem>
            <CarouselItem className="min-w-fit basis-0">
              <FilterCategory />
            </CarouselItem>
            <CarouselItem className="min-w-fit basis-0">
              <FilterPrice />
            </CarouselItem>
            <CarouselItem className="min-w-fit basis-0">
              <FilterRating />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>

      <FilterReset />
    </div>
  );
}
