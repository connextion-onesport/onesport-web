import Hero from '@/components/Hero';

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4">
      <Hero />
      <section className="p-4 sm:p-8"></section>
    </main>
  );
}
