import BlogItem from "./BlogItem";

export default function BlogList() {
  return (
    <section className="sm: grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
    </section>
  );
}
