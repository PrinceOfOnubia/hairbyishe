import { cookies } from "next/headers";
import { AdminDashboard } from "./admin-dashboard";
import { AdminLogin } from "./admin-login";
import { ADMIN_COOKIE, verifyAdminSession } from "./auth";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const dynamic="force-dynamic";
export const metadata={title:"Studio Admin",robots:{index:false,follow:false}};
export default async function Page(){const store=await cookies();if(!verifyAdminSession(store.get(ADMIN_COOKIE)?.value))return <AdminLogin/>;const orders=await prisma.order.findMany({orderBy:{createdAt:"desc"},take:100,include:{items:{include:{product:true}}}});return <AdminDashboard email={process.env.ADMIN_USERNAME||"admin"} orders={orders.map(order=>({...order,createdAt:order.createdAt.toISOString(),updatedAt:order.updatedAt.toISOString()}))}/>}
