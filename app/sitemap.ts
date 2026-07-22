import type { MetadataRoute } from "next";
import { products } from "./data";
export default function sitemap():MetadataRoute.Sitemap{ const base="https://hairbyishe.vercel.app"; return ["","/collections","/about","/contact","/cart","/checkout"].map(path=>({url:base+path,lastModified:new Date(),changeFrequency:"weekly" as const,priority:path===""?1:.8})).concat(products.map(p=>({url:`${base}/products/${p.id}`,lastModified:new Date(),changeFrequency:"weekly" as const,priority:.9}))); }
