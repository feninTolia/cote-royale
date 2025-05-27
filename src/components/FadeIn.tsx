"use client";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactNode, useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  vars?: gsap.TweenVars;
  className?: string;
  start?: string;
  children: ReactNode;
};

const FadeIn = ({ vars, className, children, start = "top 80%" }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(containerRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start,
          },
          duration: 5,
          ease: "power3.out",
          opacity: 1,
          y: 0,
          ...vars,
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.to(containerRef.current, {
          duration: 0.5,
          ease: "none",
          opacity: 1,
          y: 0,
          //   ...vars,
        });
      });
    },
    { scope: containerRef },
  );
  return (
    <div ref={containerRef} className={clsx("opacity-0", className)}>
      {children}
    </div>
  );
};

export default FadeIn;
