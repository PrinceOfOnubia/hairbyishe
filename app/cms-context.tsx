"use client";
import { createContext, useContext } from "react";
import type { Product } from "./data";
export type CmsSettings={businessName:string;locations:string[];instagram:string;tiktok:string;phone:string;whatsapp:string;deliveryText:string;bankName:string;bankAccountName:string;bankAccountNumber:string;footerText:string};
export type CmsContent={heroTitle:string;heroSubtitle:string;heroPrimaryButton:string;heroSecondaryButton:string};
export type CmsTestimonial={id:string;name:string;location:string;quote:string};
export type CmsData={products:Product[];settings:CmsSettings;content:CmsContent;testimonials:CmsTestimonial[]};
const defaults:CmsData={products:[],settings:{businessName:"HairByIshe",locations:["Akure","Lagos"],instagram:"https://www.instagram.com/hairbyishe",tiktok:"https://www.tiktok.com/@hairbyishe_2",phone:"08038636561",whatsapp:"2348038636561",deliveryText:"Nationwide Delivery Across Nigeria",bankName:"Wema Bank",bankAccountName:"HairByIshe Enterprises",bankAccountNumber:"1234567890",footerText:"Thoughtfully sourced hair. Beautifully made units. Made personal, just for you."},content:{heroTitle:"Hair that feels like you.",heroSubtitle:"Premium human hair wigs, carefully made for the woman who knows her own style.",heroPrimaryButton:"Shop now",heroSecondaryButton:"Contact us"},testimonials:[]};
const CmsContext=createContext<CmsData>(defaults);
export function CmsProvider({data,children}:{data:CmsData;children:React.ReactNode}){return <CmsContext.Provider value={data}>{children}</CmsContext.Provider>}
export function useCms(){return useContext(CmsContext)}
