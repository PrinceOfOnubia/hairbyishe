import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600"] });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://hairbyishe.com"),
  title: { default: "HairByIshe | Premium Human Hair Wigs", template: "%s | HairByIshe" },
  description: "Luxury human hair wigs and ready-to-wear units, available in Akure & Lagos with nationwide delivery across Nigeria.",
  openGraph: { title: "HairByIshe", description: "Premium human hair wigs, beautifully made for you.", type: "website", locale: "en_NG", images: [{ url: "/og.png", width: 1536, height: 905, alt: "HairByIshe — Premium Human Hair Wigs" }] },
  twitter: { card: "summary_large_image", title: "HairByIshe", description: "Premium human hair wigs, delivered nationwide.", images: ["/og.png"] },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${display.variable} ${sans.variable}`}>{children}</body></html>;
}
