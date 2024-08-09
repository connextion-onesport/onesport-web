import { categoryFilter } from "@/lib/constants";
export default function CategoryModal() {
  return (
    <div className="flex flex-col gap-4 p-5">
      <p className="text-lg font-semibold">Category</p>
      <div className="flex flex-col gap-4 p-2">
        {categoryFilter.map((category) => (
          <div className="flex rounded-full border p-2" key={category.id}>
            <input
              type="radio"
              name="category"
              id={category.id}
              value={category.value}
              className="my-auto h-4 w-4 self-center"
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
