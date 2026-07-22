import { NextResponse } from "next/server";
import { ADMIN_COOKIE,createAdminSession } from "../../../admin/auth";
export async function POST(request:Request){const{username,password}=await request.json();if(username!==process.env.ADMIN_USERNAME||password!==process.env.ADMIN_PASSWORD)return NextResponse.json({error:"Invalid credentials"},{status:401});const response=NextResponse.json({ok:true});response.cookies.set(ADMIN_COOKIE,createAdminSession(username),{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:60*60*12});return response}
