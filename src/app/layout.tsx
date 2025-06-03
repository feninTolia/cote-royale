import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";

const gambarino = localFont({
  src: "./gambarino.woff2",
  variable: "--font-gambarino",
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.site_title ?? "Côte Royale Paris",
    description:
      settings.data.meta_description ??
      "Discover the fragrance crafted for you by Côte Royal Paris",
    openGraph: {
      images: isFilled.image(settings.data.fallback_og_image)
        ? [settings.data.fallback_og_image.url]
        : ["/cote-royale-og-image.png"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${raleway.variable} ${gambarino.variable} antialiased`}
    >
      <body className="bg-neutral-900 text-white">
        <main className="pt-14 md:pt-16">
          <Navbar />
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
