import Image from "next/image";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  darkVariant?: "brand" | "white";
};

export function BrandLogo({ className, darkVariant = "brand" }: BrandLogoProps) {
  const darkLogo = darkVariant === "white"
    ? {
        src: "/assets/innova-america-logo-footer-white.png",
        width: 1200,
        height: 296,
        className: "inset-0 h-full w-full object-contain object-left"
      }
    : {
        src: "/assets/innova-america-logo-dark-horizontal.png",
        width: 3159,
        height: 825,
        className: "left-0 top-1/2 h-[89%] w-full -translate-y-1/2 object-fill"
      };

  return (
    <span className={cn("relative block overflow-hidden", className)}>
      <Image
        src="/assets/innova-america-logo-horizontal.png"
        alt="Innova America Industries Resources"
        width={2050}
        height={513}
        priority
        sizes="(min-width: 640px) 184px, 126px"
        className="h-full w-full object-contain object-left dark:hidden"
      />
      <span className="relative hidden h-full w-full overflow-hidden dark:block">
        <Image
          src={darkLogo.src}
          alt="Innova America Industries Resources"
          width={darkLogo.width}
          height={darkLogo.height}
        priority
        sizes="(min-width: 640px) 184px, 126px"
          unoptimized={darkLogo.src.endsWith(".svg")}
          className={cn("absolute", darkLogo.className)}
        />
      </span>
    </span>
  );
}
