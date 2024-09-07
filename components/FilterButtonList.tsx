import FilterDialog from './FilterDialog';
import OrderByDialog from './OrderByDialog';
import CategoryDialog from './CategoryDialog';
import PriceDialog from './PriceDialog';
import RatingDialog from './RatingDialog';
import {useState} from 'react';

interface FilterButtonListProps {
  onOrder: (value: string) => void;
  onRating: (value: number) => void;
  onCategory: (value: string) => void;
}

interface FilterValues {
  order: string;
  rating: number;
  category: string;
}

export default function FilterButtonList({onOrder, onRating, onCategory}: FilterButtonListProps) {
  const [order, setOrder] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [category, setCategory] = useState<string>('');

  const handleOrderChange = (value: string) => {
    setOrder(value);
    onOrder(value);
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
    onRating(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    onCategory(value);
  };

  return (
    <div className="flex flex-row">
      <FilterDialog
        onOrder={handleOrderChange}
        onRating={handleRatingChange}
        onCategory={handleCategoryChange}
        order={order}
        rating={rating}
        category={category}
      />
      <div className="flex flex-row flex-wrap gap-2 border-l-2 px-3">
        <OrderByDialog onOrder={handleOrderChange} order={order} />
        <CategoryDialog onCategory={handleCategoryChange} category={category} />
        <PriceDialog />
        <RatingDialog onRating={handleRatingChange} rating={rating} />
      </div>
    </div>
  );
}
