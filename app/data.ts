export type Product = {
  id: string; name: string; price: number; category: string; image: string;
  tag?: string; featured?: boolean; bestSeller?: boolean; description: string;
  dbId?: string; images?: string[]; inventory?: number;
};

export const categories = ["Lace Wigs", "Frontal Wigs", "Closure Wigs", "Bone Straight", "Curly Hair", "Body Wave", "Raw Hair", "Accessories"];

export const products: Product[] = [
  { id: "luxury-bone-straight-wig", name: "Luxury Bone Straight Wig", price: 250000, category: "Bone Straight", image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=88", tag: "Signature", featured: true, bestSeller: true, description: "Silky, sleek and impeccably finished. A premium bone-straight unit designed for effortless polish." },
  { id: "hd-frontal-body-wave", name: "HD Frontal Body Wave", price: 180000, category: "Body Wave", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=88", tag: "Bestseller", featured: true, bestSeller: true, description: "Soft, fluid body waves paired with an undetectable HD frontal for a natural hairline." },
  { id: "raw-vietnamese-curly", name: "Raw Vietnamese Curly", price: 320000, category: "Raw Hair", image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1200&q=88", tag: "Raw Collection", featured: true, description: "Full-bodied raw curls with beautiful definition, bounce and lasting versatility." },
  { id: "ready-to-wear-unit", name: "Ready-To-Wear Unit", price: 150000, category: "Closure Wigs", image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1200&q=88", tag: "Ready Now", bestSeller: true, description: "A polished, beginner-friendly closure unit styled and ready to wear straight from the box." },
];

export function formatPriceNGN(value: number) { return `₦${new Intl.NumberFormat("en-NG").format(value)}`; }
