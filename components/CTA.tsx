import Link from "next/link";
import { Button } from "./ui/button";

export default function CTA() {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 p-8">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-2xl font-bold">Latest Updates</h3>
        <p className="text-sm">Stay connected with us on Instagram</p>
      </div>

      <Button size="lg" asChild>
        <Link href="https://instagram.com/" target="_blank">
          Follow Us
        </Link>
      </Button>
    </section>
  );
}
