import { createHmac, timingSafeEqual } from "node:crypto";
export const ADMIN_COOKIE = "hairbyishe_admin";
function signature(username: string) { const secret=process.env.ADMIN_SESSION_SECRET; return secret?createHmac("sha256",secret).update(username).digest("hex"):""; }
export function createAdminSession(username:string){return `${username}.${signature(username)}`}
export function verifyAdminSession(value?:string){if(!value)return false;const split=value.lastIndexOf(".");if(split<1)return false;const username=value.slice(0,split),supplied=value.slice(split+1),expected=signature(username);if(!expected||supplied.length!==expected.length)return false;return timingSafeEqual(Buffer.from(supplied),Buffer.from(expected))}
