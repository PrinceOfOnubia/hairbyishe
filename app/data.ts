export type Product = {
  id: string; name: string; price: number; category: string; image: string;
  tag?: string; featured?: boolean; bestSeller?: boolean; description: string;
  dbId?: string; images?: string[]; media?: Array<{url:string;type:string}>; inventory?: number;
  lengths?: string[]; densities?: string[]; colors?: string[];
};

export const categories = ["Lace Wigs", "Frontal Wigs", "Closure Wigs", "Bone Straight", "Curly Hair", "Body Wave", "Raw Hair", "Accessories"];

export const products: Product[] = [
  { id: "luxury-bone-straight-wig", name: "Luxury Bone Straight Wig", price: 250000, category: "Bone Straight", image: "/product-bone-straight.png", tag: "Signature", featured: true, bestSeller: true, description: "Silky, sleek and impeccably finished. A premium bone-straight unit designed for effortless polish." },
  { id: "hd-frontal-body-wave", name: "HD Frontal Body Wave", price: 180000, category: "Body Wave", image: "/product-body-wave.png", tag: "Bestseller", featured: true, bestSeller: true, description: "Soft, fluid body waves paired with an undetectable HD frontal for a natural hairline." },
  { id: "raw-vietnamese-curly", name: "Raw Vietnamese Curly", price: 320000, category: "Raw Hair", image: "/product-raw-curly.png", tag: "Raw Collection", featured: true, description: "Full-bodied raw curls with beautiful definition, bounce and lasting versatility." },
  { id: "ready-to-wear-unit", name: "Ready-To-Wear Unit", price: 150000, category: "Closure Wigs", image: "/product-ready-to-wear.png", tag: "Ready Now", bestSeller: true, description: "A polished, beginner-friendly closure unit styled and ready to wear straight from the box." },
];

export function formatPriceNGN(value: number) { return `₦${new Intl.NumberFormat("en-NG").format(value)}`; }
