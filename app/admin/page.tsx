import { requireChatGPTUser } from "../chatgpt-auth";
import { AdminDashboard } from "./admin-dashboard";
export const dynamic="force-dynamic";
export const metadata={title:"Studio Admin",robots:{index:false,follow:false}};
export default async function Page(){const user=await requireChatGPTUser("/admin");return <AdminDashboard email={user.email}/>}
