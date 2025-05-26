import { Bounded } from "@/components/Bounded";
import FadeIn from "@/components/FadeIn";
import RevealText from "@/components/RevealText";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { FC } from "react";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-screen overflow-hidden bg-neutral-950"
    >
      <FadeIn
        vars={{ scale: 1, opacity: 0.5 }}
        className="absolute inset-0 opacity-0 motion-safe:scale-125"
      >
        <PrismicNextImage
          field={slice.primary.image}
          alt=""
          priority
          fill
          className="object-cover motion-reduce:opacity-50"
        />
      </FadeIn>

      <div className="relative flex h-screen flex-col justify-center">
        <RevealText
          id="hero-heading"
          field={slice.primary.heading}
          staggerAmount={0.2}
          duration={1.7}
          className="font-display max-w-xl text-6xl leading-none text-neutral-50 md:text-7xl lg:text-8xl"
        />

        <FadeIn
          vars={{ delay: 1, duration: 1.3 }}
          className="mt-6 max-w-md text-lg text-neutral-100 motion-safe:translate-y-8"
        >
          <PrismicRichText field={slice.primary.body} />
        </FadeIn>

        <FadeIn
          vars={{ delay: 1.7, duration: 1.1 }}
          className="mt-8 motion-safe:translate-y-5"
        >
          {slice.primary.button.map((link) => (
            <PrismicNextLink
              key={link.key}
              field={link}
              className={clsx(
                "inline-flex items-center justify-center px-12 py-4 text-center font-extrabold tracking-wider uppercase transition-colors duration-300",
                link.variant === "Secondary"
                  ? "border border-white text-white hover:bg-white/20"
                  : "bgw-white text-black hover:bg-white/80",
                "w-fit",
              )}
            />
          ))}
        </FadeIn>
      </div>
    </Bounded>
  );
};

export default Hero;
