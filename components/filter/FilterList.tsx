import {FilterAll, FilterCategory, FilterOrder, FilterPrice, FilterRating, FilterReset} from './';
import {Carousel, CarouselContent, CarouselItem} from '@/components/ui/carousel';
import { Separator } from '../ui/separator';

export default function FilterList() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 overflow-hidden">
        <FilterAll />
        <Separator orientation="vertical" className="hidden h-9 md:block" />
        <Carousel className="hidden overflow-hidden md:flex lg:w-full">
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
