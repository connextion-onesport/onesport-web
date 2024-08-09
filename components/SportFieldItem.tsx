"use client";

import Link from "next/link";

type SportFieldProps = {
  id: number;
  name: string;
  image: string;
  price_per_hour: number;
  is_indoor: boolean;
  location: string;
};

const SportFieldItem: React.FC<SportFieldProps> = ({
  id,
  is_indoor,
  location,
  name,
  image,
  price_per_hour,
}) => {
  //function to format the price number
  const formatNumber = (num: number) => {
    return Intl.NumberFormat("id-Id").format(num);
  };

  const shortenName = name.length > 22 ? name.substr(0, 22) + "..." : name;

  return (
    <Link href="/rent-field/:id">
      <div className="h-full max-h-full rounded-xl border">
        <img
          src={image}
          alt=""
          className="h-48 w-full rounded-t-xl object-cover"
        />
        <div className="flex flex-col justify-between p-4">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">{shortenName}</p>
            <div className="flex flex-row">
              <p className="mr-2 rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                {is_indoor ? "Indoor" : "Outdoor"}
              </p>
              {/* time icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#79747E"
                className="mr-1 w-4"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z"></path>
              </svg>
              <p className="self-center text-xs text-muted-foreground">
                04.00 - 20.00
              </p>
            </div>
            <p className="text-sm text-muted-foreground">{location}</p>
            <div className="flex">
              {/* star icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#FFCC15"
                className="w-4"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M11.9998 17L6.12197 20.5902L7.72007 13.8906L2.48926 9.40983L9.35479 8.85942L11.9998 2.5L14.6449 8.85942L21.5104 9.40983L16.2796 13.8906L17.8777 20.5902L11.9998 17Z"></path>
              </svg>
              <p className="text-sm text-muted-foreground">
                4.6 <span>(10 review)</span>
              </p>
            </div>
          </div>
          <div className="pt-5">
            <s className="text-base font-semibold text-muted-foreground">
              Rp 1.000.000
            </s>
            <p className="text-lg font-semibold">
              Rp {formatNumber(price_per_hour)}
              <span className="text-base font-semibold text-muted-foreground">
                /hours
              </span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SportFieldItem;
