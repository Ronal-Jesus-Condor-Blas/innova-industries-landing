"use client";

import { useEffect, useRef, useState, type CSSProperties, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number;
};

export function Reveal({ className, delay = 0, style, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          return;
        }

        // Once an item leaves through the top it stays visible, avoiding a
        // distracting disappearance while the user continues downward. When
        // it returns below the viewport, reset it so the next downward visit
        // replays the entrance on desktop and touch devices alike.
        const viewportBottom = entry.rootBounds?.bottom ?? window.innerHeight;

        if (entry.boundingClientRect.top >= viewportBottom) {
          setIsVisible(false);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.04 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal-on-scroll", isVisible && "is-visible", className)}
      style={{ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties}
      {...props}
    />
  );
}
