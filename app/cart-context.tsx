"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "./data";

export type CartItem = Pick<Product, "id" | "name" | "price" | "image"> & { length: string; density: string; quantity: number };
type CartContextValue = { items: CartItem[]; count: number; total: number; open: boolean; wishlist:string[]; setOpen: (open:boolean)=>void; addItem:(product:Product,options?:Partial<Pick<CartItem,"length"|"density"|"quantity">>)=>void; removeItem:(key:string)=>void; updateQuantity:(key:string,quantity:number)=>void; clear:()=>void; toggleWishlist:(id:string)=>void };
const CartContext=createContext<CartContextValue|null>(null);
export const cartKey=(item:CartItem)=>`${item.id}-${item.length}-${item.density}`;

export function CartProvider({children}:{children:React.ReactNode}){
  const [items,setItems]=useState<CartItem[]>([]); const [wishlist,setWishlist]=useState<string[]>([]); const [open,setOpen]=useState(false); const [ready,setReady]=useState(false);
  useEffect(()=>{const id=window.setTimeout(()=>{try{setItems(JSON.parse(localStorage.getItem("hairbyishe-cart")||"[]"));setWishlist(JSON.parse(localStorage.getItem("hairbyishe-wishlist")||"[]"))}catch{setItems([]);setWishlist([])}setReady(true)},0);return()=>window.clearTimeout(id)},[]);
  useEffect(()=>{if(ready)localStorage.setItem("hairbyishe-cart",JSON.stringify(items))},[items,ready]);
  useEffect(()=>{if(ready)localStorage.setItem("hairbyishe-wishlist",JSON.stringify(wishlist))},[wishlist,ready]);
  const value=useMemo<CartContextValue>(()=>({items,wishlist,count:items.reduce((n,i)=>n+i.quantity,0),total:items.reduce((n,i)=>n+i.price*i.quantity,0),open,setOpen,
    addItem:(product,options={})=>{const next={id:product.id,name:product.name,price:product.price,image:product.image,length:options.length||"18\"",density:options.density||"180%",quantity:options.quantity||1};setItems(current=>{const key=cartKey(next);const found=current.find(i=>cartKey(i)===key);return found?current.map(i=>cartKey(i)===key?{...i,quantity:i.quantity+next.quantity}:i):[...current,next]});setOpen(true)},
    removeItem:key=>setItems(current=>current.filter(i=>cartKey(i)!==key)),updateQuantity:(key,quantity)=>setItems(current=>current.map(i=>cartKey(i)===key?{...i,quantity:Math.max(1,quantity)}:i)),clear:()=>setItems([]),toggleWishlist:id=>setWishlist(current=>current.includes(id)?current.filter(item=>item!==id):[...current,id])}),[items,open,wishlist]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart(){const value=useContext(CartContext);if(!value)throw new Error("useCart must be used inside CartProvider");return value}
