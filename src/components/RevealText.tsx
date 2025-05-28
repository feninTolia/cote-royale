"use client";

import { useGSAP } from "@gsap/react";
import { asText, RichTextField } from "@prismicio/client";
import clsx from "clsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ElementType, useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  field: RichTextField;
  id: string;
  className?: string;
  staggerAmount?: number;
  as?: ElementType;
  duration?: number;
  start?: string;
  align?: "start" | "center" | "end";
};

const RevealText = ({
  field,
  id,
  className,
  staggerAmount = 0.1,
  align = "start",
  start = "top 80%",
  as: Component = "div",
  duration = 0.8,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".reveal-text-word", {
          y: 0,
          duration,
          stagger: staggerAmount,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start,
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.to(".reveal-text-word", {
          y: 0,
          duration: 0,
          opacity: 1,
          stagger: 0,
          ease: "none",
        });
      });
    },
    { scope: containerRef },
  );

  const words = asText(field).split(" ");

  return (
    <Component
      className={clsx(
        "reveal-text text-balance",
        align === "center" && "text-center",
        align === "start" && "text-left",
        align === "end" && "text-right",
        className,
      )}
      ref={containerRef}
    >
      {words.map((word, idx) => (
        <span
          key={`${word}-${idx}-${id}`}
          className="mb-0 inline-block overflow-hidden pb-4"
        >
          <span className="reveal-text-word mt-0 inline-block translate-y-[120%] will-change-transform">
            {word}
            {idx < words.length - 1 ? <span>&nbsp;</span> : null}
          </span>
        </span>
      ))}
    </Component>
  );
};

export default RevealText;
