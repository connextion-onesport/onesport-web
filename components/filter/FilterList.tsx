import {useState} from 'react';
import {FilterAll, FilterCategory, FilterOrder, FilterPrice, FilterRating} from './';
import {Carousel, CarouselContent, CarouselItem} from '@/components/ui/carousel';

interface FilterValues {
  order: string;
  rating: number;
  category: string;
}

export default function FilterList() {
  const [order, setOrder] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [category, setCategory] = useState<string>('');

  const handleOrderChange = (value: string) => {
    setOrder(value);
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  return (
    <div className="flex flex-row gap-4">
      <FilterAll
        onOrder={handleOrderChange}
        onRating={handleRatingChange}
        onCategory={handleCategoryChange}
        order={order}
        rating={rating}
        category={category}
      />

      <Carousel className="flex overflow-hidden lg:w-full">
        <CarouselContent>
          <CarouselItem className="min-w-fit basis-0">
            <FilterOrder onOrder={handleOrderChange} order={order} />
          </CarouselItem>
          <CarouselItem className="min-w-fit basis-0">
            <FilterCategory onCategory={handleCategoryChange} category={category} />
          </CarouselItem>
          <CarouselItem className="min-w-fit basis-0">
            <FilterPrice />
          </CarouselItem>
          <CarouselItem className="min-w-fit basis-0">
            <FilterRating onRating={handleRatingChange} rating={rating} />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
