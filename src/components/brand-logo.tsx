import Image from "next/image";

import { cn } from "@/lib/utils";

export function BrandLogo({ className }: { className?: string }) {
  return (
    <span className={cn("relative block overflow-hidden", className)}>
      <Image
        src="/assets/innova-america-logo-horizontal.png"
        alt="Innova America Industries Resources"
        width={2050}
        height={513}
        priority
        className="h-full w-auto object-contain dark:hidden"
      />
      <span className="relative hidden h-full w-full dark:block">
        <Image
          src="/assets/innova-america-logo-dark.svg"
          alt="Innova America Industries Resources"
          width={855}
          height={973}
          priority
          unoptimized
          className="absolute left-0 top-1/2 h-auto w-full -translate-y-1/2"
        />
      </span>
    </span>
  );
}
