import { put } from "@vercel/blob";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE,verifyAdminSession } from "../../../admin/auth";
export async function POST(request:Request){const store=await cookies();if(!verifyAdminSession(store.get(ADMIN_COOKIE)?.value))return NextResponse.json({error:"Unauthorized"},{status:401});const data=await request.formData();const file=data.get("file");if(!(file instanceof File)||!file.type.startsWith("image/"))return NextResponse.json({error:"Choose an image file"},{status:400});if(file.size>8*1024*1024)return NextResponse.json({error:"Image must be under 8 MB"},{status:400});const blob=await put(`products/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g,"-")}`,file,{access:"public",addRandomSuffix:true});return NextResponse.json({url:blob.url,pathname:blob.pathname})}
