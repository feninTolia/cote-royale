import { asImageSrc, asText } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Bounded } from "@/components/Bounded";
import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import FragranceAttributes from "@/components/FragranceAttributes";
import { formatPrice } from "@/utils/formatters";
import { HiStar } from "react-icons/hi";
import OtherFragrances from "@/components/OtherFragrances";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const fragrance = await client
    .getByUID("fragrance", uid)
    .catch(() => notFound());

  return (
    <Bounded className="py-10">
      <div className="grid grid-cols-1 items-center gap-10 pb-10 lg:grid-cols-2">
        <div className="relative mb-14 flex justify-center pb-10">
          <PrismicNextImage
            field={fragrance.data.bottle_image}
            width={600}
            height={600}
            priority
            className="absolute top-[90%] -scale-y-100 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0)_70%,rgba(0,0,0,0.15)_100%)]"
          />
          <PrismicNextImage
            field={fragrance.data.bottle_image}
            width={600}
            height={600}
            priority
            className="relative"
          />
        </div>

        {/* Product info section */}

        <div className="text-white">
          <h1 className="font-display mb-4 border-b border-neutral-700 pb-2 text-4xl md:text-5xl">
            <PrismicRichText
              field={fragrance.data.title}
              fallback="Fragrance"
            />
          </h1>
          <div className="space-y-6">
            <p className="text-base font-semibold">Eau de Parfum Spray</p>
            <PrismicRichText field={fragrance.data.description} />
            <FragranceAttributes
              scentProfile={fragrance.data.scent_profile}
              mood={fragrance.data.mood}
            />

            <p className="mt-10 text-3xl font-light">
              {formatPrice(fragrance.data.price)}
            </p>

            <button className="w-full bg-white py-3 font-medium text-black uppercase transition duration-200 hover:bg-neutral-200">
              Add to Bag
            </button>

            <div className="flex items-center gap-4 border-t border-neutral-700 pt-6">
              <a href="#" className="hover:text-neutral-30 0">
                710 total reviews
              </a>
              <div className="flex">
                {[...Array(4)].map((_, idx) => (
                  <HiStar key={idx} className="size-5 text-white" />
                ))}
                <HiStar className="size-5 text-white/50" />
              </div>
              <span>4.4/5</span>
            </div>
          </div>
        </div>
      </div>
      <OtherFragrances currentFragranceId={fragrance.uid} />
    </Bounded>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("fragrance", uid).catch(() => notFound());

  return {
    title: asText(page.data.title) + " | Côte Royal",
    description: `Discover ${asText(page.data.title)}, the newest fragrance from Côte Royal`,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("fragrance");

  return pages.map((page) => ({ uid: page.uid }));
}
