import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./cart-context";
import { CmsProvider, type CmsData } from "./cms-context";
import { prisma } from "./lib/prisma";
import { products as fallbackProducts } from "./data";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hairbyishe.com"),
  title: {
    default: "HairByIshe | Premium Human Hair Wigs",
    template: "%s | HairByIshe",
  },
  description:
    "Luxury human hair wigs and ready-to-wear units, available in Akure & Lagos with nationwide delivery across Nigeria.",
  openGraph: {
    title: "HairByIshe",
    description: "Premium human hair wigs, beautifully made for you.",
    type: "website",
    locale: "en_NG",
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 905,
        alt: "HairByIshe — Premium Human Hair Wigs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HairByIshe",
    description: "Premium human hair wigs, delivered nationwide.",
    images: ["/og.png"],
  },
  icons: { icon: "/icon.jpg" },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let data: CmsData;
  try {
    const [dbProducts, settings, contentBlock, testimonials] =
      await Promise.all([
        prisma.product.findMany({
          where: { published: true },
          include: { category: true, images: { orderBy: { position: "asc" } } },
          orderBy: { createdAt: "asc" },
        }),
        prisma.storeSettings.findUnique({ where: { id: "store" } }),
        prisma.contentBlock.findUnique({ where: { key: "homepage" } }),
        prisma.testimonial.findMany({
          where: { published: true },
          orderBy: { position: "asc" },
        }),
      ]);
    const content = (contentBlock?.value || {}) as Partial<CmsData["content"]>;
    data = {
      products: dbProducts.length
        ? dbProducts.map((product) => ({
            id: product.slug,
            dbId: product.id,
            name: product.name,
            price: product.discountPrice || product.price,
            category: product.category.name,
            image: product.images[0]?.url || fallbackProducts[0].image,
            images: product.images.map((image) => image.url),
            media: product.images.map((item) => ({url:item.url,type:item.type})),
            lengths: product.lengths,
            densities: product.densities,
            colors: product.colors,
            tag: product.bestSeller
              ? "Bestseller"
              : product.featured
                ? "Signature"
                : undefined,
            featured: product.featured,
            bestSeller: product.bestSeller,
            description: product.description,
            inventory: product.inventory,
          }))
        : fallbackProducts,
      settings: settings
        ? {
            businessName: settings.businessName,
            locations: settings.locations,
            instagram: settings.instagram,
            tiktok: settings.tiktok,
            phone: settings.phone,
            whatsapp: settings.whatsapp,
            deliveryText: settings.deliveryText,
            bankName: settings.bankName,
            bankAccountName: settings.bankAccountName,
            bankAccountNumber: settings.bankAccountNumber,
            footerText: settings.footerText,
            defaultProductDescription: settings.defaultProductDescription,
          }
        : {
            businessName: "HairByIshe",
            locations: ["Akure", "Lagos"],
            instagram: "https://www.instagram.com/hairbyishe",
            tiktok: "https://www.tiktok.com/@hairbyishe_2",
            phone: "08038636561",
            whatsapp: "2348038636561",
            deliveryText: "Nationwide Delivery Across Nigeria",
            bankName: "Wema Bank",
            bankAccountName: "HairByIshe Enterprises",
            bankAccountNumber: "1234567890",
            footerText:
              "Thoughtfully sourced hair. Beautifully made units. Made personal, just for you.",
            defaultProductDescription: "Premium quality hair.\n\nSoft, silky and long-lasting.\n\nFeatures:\n\n✓ Minimal shedding\n✓ Tangle free\n✓ Natural hairline\n✓ Beginner friendly\n✓ Luxury quality\n\nDelivery available nationwide and internationally.",
          },
      content: {
        heroTitle: content.heroTitle || "Hair that feels like you.",
        heroSubtitle:
          content.heroSubtitle ||
          "Premium human hair wigs, carefully made for the woman who knows her own style.",
        heroPrimaryButton: content.heroPrimaryButton || "Shop now",
        heroSecondaryButton: content.heroSecondaryButton || "Contact us",
      },
      testimonials: testimonials.map((item) => ({
        id: item.id,
        name: item.name,
        location: item.location,
        quote: item.quote,
      })),
    };
  } catch {
    data = {
      products: fallbackProducts,
      settings: {
        businessName: "HairByIshe",
        locations: ["Akure", "Lagos"],
        instagram: "https://www.instagram.com/hairbyishe",
        tiktok: "https://www.tiktok.com/@hairbyishe_2",
        phone: "08038636561",
        whatsapp: "2348038636561",
        deliveryText: "Nationwide Delivery Across Nigeria",
        bankName: "Wema Bank",
        bankAccountName: "HairByIshe Enterprises",
        bankAccountNumber: "1234567890",
        footerText:
          "Thoughtfully sourced hair. Beautifully made units. Made personal, just for you.",
        defaultProductDescription: "Premium quality hair.\n\nSoft, silky and long-lasting.\n\nFeatures:\n\n✓ Minimal shedding\n✓ Tangle free\n✓ Natural hairline\n✓ Beginner friendly\n✓ Luxury quality\n\nDelivery available nationwide and internationally.",
      },
      content: {
        heroTitle: "Hair that feels like you.",
        heroSubtitle:
          "Premium human hair wigs, carefully made for the woman who knows her own style.",
        heroPrimaryButton: "Shop now",
        heroSecondaryButton: "Contact us",
      },
      testimonials: [],
    };
  }
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable}`}>
        <CmsProvider data={data}>
          <CartProvider>{children}</CartProvider>
        </CmsProvider>
      </body>
    </html>
  );
}
