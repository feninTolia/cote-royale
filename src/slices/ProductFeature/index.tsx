import { Bounded } from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import FadeIn from "@/components/FadeIn";
import { createClient } from "@/prismicio";
import { formatPrice } from "@/utils/formatters";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FC } from "react";

export type ProductFeatureProps =
  SliceComponentProps<Content.ProductFeatureSlice>;

const ProductFeature: FC<ProductFeatureProps> = async ({ slice }) => {
  const client = createClient();
  const fragrance = isFilled.contentRelationship(slice.primary.fragrance)
    ? await client.getByID<Content.FragranceDocument>(
        slice.primary.fragrance.id,
      )
    : null;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden bg-black py-16 text-white md:py-24"
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3 lg:grid-rows-[auto,auto]">
        <FadeIn
          className="opacity-0 motion-safe:translate-y-16 lg:col-span-2 lg:row-span-2"
          vars={{ duration: 1 }}
        >
          <PrismicNextImage
            field={slice.primary.image}
            className="h-auto w-full object-cover"
            alt=""
          />
        </FadeIn>

        <FadeIn
          vars={{ duration: 1 }}
          className="space-y-6 self-start bg-white/10 p-10 opacity-0 motion-safe:translate-y-16 lg:col-start-3 lg:row-start-1"
        >
          <div className="text-3xl leading-tight font-semibold md:text-4xl">
            <PrismicRichText field={slice.primary.heading} />
          </div>

          <div className="max-w-lg text-base text-gray-300">
            <PrismicRichText field={slice.primary.description} />
          </div>
        </FadeIn>

        <FadeIn
          vars={{ duration: 1, delay: 1 }}
          className="animate-in relative self-end bg-white/10 opacity-0 will-change-transform motion-safe:translate-y-16"
        >
          <PrismicNextImage
            alt=""
            field={fragrance?.data.bottle_image}
            className="mx-auto -mt-10 w-full -rotate-12 md:-mt-20"
          />
          <div className="flex justify-between p-10 pt-4">
            <div className="space-y-1">
              <div className="font-display text-4xl">
                <PrismicRichText
                  field={fragrance?.data.title}
                  fallback={"Fragrance"}
                />
              </div>
              <p className="mt-2 text-gray-400">Eue de Parfum</p>
              <ButtonLink
                document={fragrance}
                className="mt-6"
                variant="Secondary"
              >
                Shop Now
              </ButtonLink>
            </div>

            <p className="mt-4 text-gray-100" aria-label="Product Price">
              <span>{formatPrice(fragrance?.data.price)}</span>
            </p>
          </div>
        </FadeIn>
      </div>
    </Bounded>
  );
};

export default ProductFeature;
