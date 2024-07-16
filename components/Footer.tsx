import { Button } from "./ui/button";
import Link from "next/link";
import { footerColumnLinks, footerSocialMedia } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-center gap-8 text-white">
      <div className="flex w-full flex-col items-start justify-between gap-8 sm:flex-row">
        <div className="flex flex-col gap-4">
          <span className="text-4xl font-bold">One Sport</span>
          <div className="flex items-center gap-2">
            {footerSocialMedia.map((social) => (
              <Button
                asChild
                size="icon"
                variant="secondary"
                className="rounded-full"
                aria-label={social.name}
              >
                <Link href={social.link} target="_blank">
                  <social.icon size="20" />
                </Link>
              </Button>
            ))}
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">
              Are you interested with the offer?
            </span>
            <span>Sign in or try to manage your services.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {footerColumnLinks.map((column) => (
            <div className="flex flex-col gap-4">
              <span className="text-lg font-bold">{column.title}</span>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li className="text-sm hover:underline">
                    <Link href={link.link}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full items-center justify-center border-t border-white p-8">
        <span className="text-sm">
          © {year} |{" "}
          <Link href="/" className="hover:underline">
            One Sport
          </Link>
        </span>
      </div>
    </div>
  );
}
