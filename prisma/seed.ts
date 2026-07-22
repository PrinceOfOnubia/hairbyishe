import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const seedProducts = [
  ["Luxury Bone Straight Wig", "luxury-bone-straight-wig", 250000, "Bone Straight"],
  ["HD Frontal Body Wave", "hd-frontal-body-wave", 180000, "Body Wave"],
  ["Raw Vietnamese Curly", "raw-vietnamese-curly", 320000, "Raw Hair"],
  ["Ready-To-Wear Unit", "ready-to-wear-unit", 150000, "Closure Wigs"],
] as const;
async function main(){for(const [name,slug,price,categoryName] of seedProducts){const category=await prisma.category.upsert({where:{slug:categoryName.toLowerCase().replaceAll(" ","-")},update:{},create:{name:categoryName,slug:categoryName.toLowerCase().replaceAll(" ","-")}});await prisma.product.upsert({where:{slug},update:{},create:{name,slug,price,description:`Premium ${name} by HairByIshe.`,inventory:12,featured:true,categoryId:category.id}})}}
main().finally(()=>prisma.$disconnect());
