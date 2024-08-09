import { Button } from "./ui/button";

export default function RatingModal() {
  return (
    <div className="p-5">
      <p className="text-lg font-semibold">Rating</p>
      <div className="grid grid-cols-2 pb-4 pt-3">
        <Button
          variant="outline"
          className="rounded-l-full border-r-white font-normal text-muted-foreground"
        >
          4.0 +
        </Button>
        <Button
          variant="outline"
          className="border-l-none rounded-r-full font-normal text-muted-foreground"
        >
          4.5 +
        </Button>
      </div>
    </div>
  );
}
