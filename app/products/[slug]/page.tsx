import { notFound } from "next/navigation";
import { products } from "../../data";
import { ProductPage } from "../../storefront";
export function generateStaticParams(){ return products.map(product=>({slug:product.id})); }
export default async function Page({params}:{params:Promise<{slug:string}>}){ const {slug}=await params; const product=products.find(p=>p.id===slug); if(!product) notFound(); return <><ProductPage product={product}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"Product",name:product.name,image:[product.image],description:product.description,brand:{"@type":"Brand",name:"HairByIshe"},offers:{"@type":"Offer",priceCurrency:"NGN",price:product.price,availability:"https://schema.org/InStock"}})}}/></>; }
