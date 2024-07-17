import { RiMoreFill } from "react-icons/ri";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function BlogItem() {
  return (
    <div className="rounded-xl border">
      <div className="flex flex-row justify-between gap-2 p-4">
        <div className="flex flex-row gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="line-clamp-1 font-semibold">Daniel</h3>
            <div className="flex flex-row gap-1 text-sm">
              <span className="whitespace-nowrap">2h ago</span>
              <span>-</span>
              <span className="line-clamp-1">Gelora Bung Karno</span>
            </div>
          </div>
        </div>

        <Button size="icon" variant="ghost">
          <RiMoreFill size={24} />
        </Button>
      </div>

      <figure className="relative aspect-video w-full overflow-hidden">
        <Image
          src="/images/img_bicycle.webp"
          // width={600}
          // height={300}
          objectFit="cover"
          layout="fill"
          loading="lazy"
          alt="Bicycle Competiton"
        />
      </figure>

      <div className="flex flex-col gap-2 p-4">
        <p>Thank you all for joining us.</p>
        <div className="flex flex-row gap-2">
          <Button size="sm" variant="secondary">
            Event
          </Button>
          <Button size="sm" variant="secondary">
            Community
          </Button>
        </div>
      </div>
    </div>
  );
}
