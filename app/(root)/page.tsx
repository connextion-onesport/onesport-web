import Hero from "@/components/Hero";
import Recommendation from "@/components/Recommendation";
import FlashSale from "@/components/FlashSale";
import CTA from "@/components/CTA";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4 p-4 sm:p-8">
      <Hero />
      <Recommendation />
      <FlashSale />
      <CTA />
    </main>
  );
}
