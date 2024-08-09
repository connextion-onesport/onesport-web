import FilterButton from "./FilterButton";
import PriceButton from "./PriceButton";
import OrderByButton from "./OrderByButton";
import RatingButton from "./RatingButton";
import CategoryButton from "./CategoryButton";
export default function FilterButtonList() {
  return (
    <>
      <div className="flex flex-row">
        <FilterButton />
        <div className="flex flex-row flex-wrap gap-2 border-l-2 px-3">
          <OrderByButton />
          <CategoryButton />
          <PriceButton />
          <RatingButton />
        </div>
      </div>
    </>
  );
}
