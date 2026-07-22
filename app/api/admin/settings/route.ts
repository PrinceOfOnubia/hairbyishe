import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ADMIN_COOKIE, verifyAdminSession } from "../../../admin/auth";
const prisma=new PrismaClient();
export async function POST(request:Request){const store=await cookies();if(!verifyAdminSession(store.get(ADMIN_COOKIE)?.value))return NextResponse.json({error:"Unauthorized"},{status:401});const body=await request.json();const settings=await prisma.storeSettings.upsert({where:{id:"store"},update:{locations:body.locations,instagram:body.instagram,tiktok:body.tiktok,phone:body.phone,whatsapp:body.whatsapp,deliveryText:"Nationwide Delivery Across Nigeria"},create:{id:"store",locations:body.locations,instagram:body.instagram,tiktok:body.tiktok,phone:body.phone,whatsapp:body.whatsapp,deliveryText:"Nationwide Delivery Across Nigeria"}});return NextResponse.json({ok:true,settings})}
