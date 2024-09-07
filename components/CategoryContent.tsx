import {categoryFilter} from '@/libs/constants';
import {useState} from 'react';

interface CategoryContentProps {
  selectedCategory: string | null;
  setSelectedCategory: (value: string) => void;
}
export default function CategoryContent({
  selectedCategory,
  setSelectedCategory,
}: CategoryContentProps) {
  const [selectCategory, setSelectCategory] = useState<string | null>(null);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectCategory(event.target.value);
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="flex flex-col gap-4 p-5">
      <p className="text-lg font-semibold">Category</p>
      <div className="flex flex-col gap-4 p-2">
        {categoryFilter.map(category => (
          <div
            className={`flex rounded-full border p-2 ${selectCategory === category.value ? 'bg-primary text-white' : ''}`}
            key={category.id}
          >
            <input
              type="radio"
              name="category"
              id={category.id}
              value={category.value}
              className="my-auto h-4 w-4 self-center"
              onChange={handleCheck}
            />
            <label htmlFor={category.htmlFor} className="px-3">
              {category.text}
            </label>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}
