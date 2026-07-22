"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Camera, ChevronDown, Heart, Menu, Minus, Plus, Search, ShoppingBag, Star, Truck, X } from "lucide-react";
import { categories, formatPriceNGN, products, type Product } from "./data";

const socials = { instagram: "https://www.instagram.com/hairbyishe", tiktok: "https://www.tiktok.com/@hairbyishe_2", whatsapp: "https://wa.me/2348000000000" };

export function Announcement() { return <div className="announcement">Available in Akure & Lagos <span /> Nationwide Delivery Across Nigeria</div>; }

export function Header() {
  const [menu, setMenu] = useState(false); const [search, setSearch] = useState(false);
  return <>
    <Announcement />
    <header className="header"><button className="mobile-icon" onClick={() => setMenu(true)} aria-label="Open menu"><Menu /></button>
      <nav className="nav-left"><Link href="/collections">Shop</Link><Link href="/about">Our Story</Link></nav>
      <Link href="/" className="wordmark">HAIRBYISHE</Link>
      <div className="nav-actions"><button onClick={() => setSearch(!search)} aria-label="Search"><Search /></button><Link href="/wishlist" aria-label="Wishlist"><Heart /></Link><Link href="/cart" aria-label="Cart"><ShoppingBag /><b>0</b></Link></div>
    </header>
    <AnimatePresence>{search && <motion.div className="searchbar" initial={{height:0,opacity:0}} animate={{height:76,opacity:1}} exit={{height:0,opacity:0}}><Search/><input autoFocus placeholder="Search wigs, textures and collections..."/><button onClick={() => setSearch(false)}><X/></button></motion.div>}</AnimatePresence>
    <AnimatePresence>{menu && <motion.aside className="mobile-menu" initial={{x:"-100%"}} animate={{x:0}} exit={{x:"-100%"}}><button onClick={() => setMenu(false)}><X/></button><Link href="/">Home</Link><Link href="/collections">Shop All</Link><Link href="/about">Our Story</Link><Link href="/contact">Contact</Link><div className="menu-social"><a href={socials.instagram}>Instagram</a><a href={socials.tiktok}>TikTok</a></div></motion.aside>}</AnimatePresence>
  </>;
}

export function Footer() { return <footer><div className="footer-top"><div><Link className="footer-logo" href="/">HAIRBYISHE</Link><p>Thoughtfully sourced hair. Beautifully made units.<br/>Made personal, just for you.</p><div className="socials"><a href={socials.instagram}><Camera/> Instagram</a><a href={socials.tiktok}>♪ TikTok</a></div></div><div><h4>Explore</h4><Link href="/collections">Shop All</Link><Link href="/about">Our Story</Link><Link href="/contact">Contact</Link><Link href="/admin">Admin</Link></div><div><h4>Visit & connect</h4><p>Available in Akure & Lagos</p><p>Nationwide delivery across Nigeria</p><a href={socials.whatsapp}>WhatsApp us</a></div><div><h4>The Ishe Edit</h4><p>New drops and hair care notes, quietly delivered.</p><div className="newsletter"><input placeholder="Email address"/><button aria-label="Subscribe"><ArrowRight/></button></div></div></div><div className="footer-bottom">© 2026 HairByIshe <span>Privacy · Terms · Delivery</span></div></footer>; }

export function Shell({ children }: { children: React.ReactNode }) { return <><Header/><main>{children}</main><Footer/></>; }

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [liked, setLiked] = useState(false);
  return <motion.article className="product-card" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.06}}>
    <div className="product-image"><Link href={`/products/${product.id}`}><img src={product.image} alt={product.name}/></Link>{product.tag && <span className="tag">{product.tag}</span>}<button className={`heart ${liked?"active":""}`} onClick={() => setLiked(!liked)} aria-label="Save to wishlist"><Heart fill={liked?"black":"none"}/></button><Link className="quick" href={`/products/${product.id}`}>Quick view</Link></div>
    <div className="product-info"><p>{product.category}</p><Link href={`/products/${product.id}`}>{product.name}</Link><strong>{formatPriceNGN(product.price)}</strong></div>
  </motion.article>;
}

export function HomePage() {
  return <Shell>
    <section className="hero"><img src="/hero-hairbyishe.png" alt="HairByIshe premium bone straight wig"/><div className="hero-copy"><p className="eyebrow">The Signature Collection</p><h1>Hair that feels<br/><em>like you.</em></h1><p>Premium human hair wigs, carefully made for the woman who knows her own style.</p><div><Link className="button light" href="/collections">Shop now <ArrowRight/></Link><Link className="text-link" href="/contact">Contact us</Link></div></div><div className="hero-note"><span>01</span><p>Luxury hair collections<br/>delivered nationwide.</p></div></section>
    <section className="intro"><p className="eyebrow">Our promise</p><h2>Beautiful hair should feel<br/>effortless, personal, <em>yours.</em></h2><p>From raw textures to ready-to-wear units, every HairByIshe piece is selected for softness, movement and lasting quality.</p></section>
    <section className="products-section"><div className="section-head"><div><p className="eyebrow">Curated for you</p><h2>Signature pieces</h2></div><Link href="/collections">View all <ArrowRight/></Link></div><div className="product-grid">{products.map((p,i)=><ProductCard key={p.id} product={p} index={i}/>)}</div></section>
    <section className="category-section"><div className="category-visual"><img src={products[2].image} alt="Curly hair collection"/><span>Raw. Real. Remarkable.</span></div><div className="category-list"><p className="eyebrow">Find your texture</p><h2>Shop by category</h2>{categories.map((c,i)=><Link href={`/collections?category=${encodeURIComponent(c)}`} key={c}><span>0{i+1}</span>{c}<ArrowRight/></Link>)}</div></section>
    <section className="why"><p className="eyebrow">The HairByIshe standard</p><h2>Quiet luxury,<br/><em>made to last.</em></h2><div className="why-grid"><article><span>01</span><h3>Premium sourcing</h3><p>Quality human hair selected for softness, fullness and longevity.</p></article><article><span>02</span><h3>Personal finish</h3><p>Small-batch units finished with the care of a trusted personal stylist.</p></article><article><span>03</span><h3>Made convenient</h3><p>Available in Akure and Lagos, with reliable nationwide delivery.</p></article></div></section>
    <section className="testimonial"><Star fill="white"/><blockquote>“The hair was exactly what I hoped for—soft, full and beautifully finished. It felt like it was made just for me.”</blockquote><p>— Amaka, Lagos</p></section>
    <section className="insta"><div className="section-head"><div><p className="eyebrow">Follow the journey</p><h2>@hairbyishe</h2></div><a href={socials.instagram}>View Instagram <ArrowRight/></a></div><div className="insta-grid">{products.map((p,i)=><a key={p.id} href={socials.instagram}><img src={p.image} alt={`HairByIshe gallery ${i+1}`}/><Camera/></a>)}</div></section>
    <section className="delivery"><Truck/><div><p className="eyebrow">From us to you</p><h2>Nationwide delivery<br/>across Nigeria.</h2></div><p>Shop from anywhere. We package each order carefully and keep you updated until it arrives.</p><Link className="button light" href="/contact">Delivery enquiries <ArrowRight/></Link></section>
  </Shell>;
}

export function CollectionsPage() {
  const [category,setCategory]=useState("All"); const [sort,setSort]=useState("featured"); const [query,setQuery]=useState("");
  const visible=useMemo(()=>products.filter(p=>(category==="All"||p.category===category)&&p.name.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>sort==="low"?a.price-b.price:sort==="high"?b.price-a.price:0),[category,sort,query]);
  return <Shell><section className="page-hero"><p className="eyebrow">The collections</p><h1>Find your <em>signature.</em></h1><p>Premium textures. Considered construction. Hair made for real life.</p></section><section className="collection-layout"><aside><h3>Categories</h3>{["All",...categories].map(c=><button className={category===c?"selected":""} key={c} onClick={()=>setCategory(c)}>{c}</button>)}</aside><div className="collection-main"><div className="collection-tools"><label><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products"/></label><span>{visible.length} pieces</span><label>Sort <select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select><ChevronDown/></label></div><div className="product-grid">{visible.map((p,i)=><ProductCard key={p.id} product={p} index={i}/>)}</div></div></section></Shell>;
}

export function ProductPage({ product }: { product: Product }) {
  const [length,setLength]=useState("18\""); const [density,setDensity]=useState("180%"); const [qty,setQty]=useState(1);
  useEffect(()=>{const recent=JSON.parse(localStorage.getItem("recent")||"[]");localStorage.setItem("recent",JSON.stringify([product.id,...recent.filter((x:string)=>x!==product.id)].slice(0,4)))},[product.id]);
  return <Shell><section className="product-page"><div className="gallery"><img src={product.image} alt={product.name}/><div><img src={product.image} alt="Front view"/><img src={product.image} alt="Hair detail"/></div></div><div className="product-detail"><p className="eyebrow">{product.category}</p><h1>{product.name}</h1><div className="rating"><span>★★★★★</span> 4.9 · 18 reviews</div><strong className="price">{formatPriceNGN(product.price)}</strong><p>{product.description}</p><fieldset><legend>Hair length <b>{length}</b></legend><div className="options">{["16\"","18\"","20\"","22\"","24\""].map(v=><button className={length===v?"selected":""} onClick={()=>setLength(v)} key={v}>{v}</button>)}</div></fieldset><fieldset><legend>Density <b>{density}</b></legend><div className="options">{["150%","180%","200%"].map(v=><button className={density===v?"selected":""} onClick={()=>setDensity(v)} key={v}>{v}</button>)}</div></fieldset><div className="buy-row"><div className="qty"><button onClick={()=>setQty(Math.max(1,qty-1))}><Minus/></button>{qty}<button onClick={()=>setQty(qty+1)}><Plus/></button></div><button className="button dark">Add to cart</button></div><button className="button outline">Buy now</button><a className="whatsapp" href={`${socials.whatsapp}?text=Hello%20HairByIshe,%20I%27m%20interested%20in%20${encodeURIComponent(product.name)}`}>WhatsApp inquiry <ArrowRight/></a><div className="delivery-note"><Truck/><div><b>Nationwide delivery available</b><p>Carefully packaged and delivered across Nigeria.</p></div></div><details><summary>Care & maintenance <Plus/></summary><p>Store on a wig stand, detangle gently and use professional care products.</p></details><details><summary>Delivery information <Plus/></summary><p>Delivery timelines vary by location and unit availability.</p></details></div></section><section className="related products-section"><div className="section-head"><h2>You may also like</h2></div><div className="product-grid">{products.filter(p=>p.id!==product.id).slice(0,3).map((p,i)=><ProductCard key={p.id} product={p} index={i}/>)}</div></section></Shell>;
}

export function SimplePage({ type }: { type: "about"|"contact"|"cart"|"wishlist" }) {
  if(type==="cart") return <Shell><section className="simple"><p className="eyebrow">Your selection</p><h1>Your bag is <em>waiting.</em></h1><div className="empty"><ShoppingBag/><h2>Your bag is currently empty</h2><p>Discover a signature unit made for you.</p><Link className="button dark" href="/collections">Explore the collection</Link></div></section></Shell>;
  if(type==="wishlist") return <Shell><section className="simple"><p className="eyebrow">Saved pieces</p><h1>Your <em>wishlist.</em></h1><div className="empty"><Heart/><h2>Keep your favourites close</h2><p>Tap the heart on any piece to save it here.</p><Link className="button dark" href="/collections">Browse the collection</Link></div></section></Shell>;
  if(type==="about") return <Shell><section className="story"><div><p className="eyebrow">The HairByIshe story</p><h1>Luxury hair,<br/><em>made personal.</em></h1></div><p>HairByIshe is a premium Nigerian hair brand offering human hair wigs, raw hair, ready-to-wear units and custom wig services. We believe luxury is not about being loud—it is about quality you can feel, thoughtful service and hair that lets you move through life with confidence.<br/><br/>Available in Akure & Lagos. Delivery nationwide.</p></section><section className="story-image"><img src={products[0].image} alt="HairByIshe craft"/><div><p className="eyebrow">Small by design</p><h2>Care in every detail.</h2><p>We are building slowly and thoughtfully, one beautiful unit and one happy client at a time.</p></div></section></Shell>;
  return <Shell><section className="contact"><p className="eyebrow">We would love to hear from you</p><h1>Let’s talk <em>hair.</em></h1><div className="contact-grid"><a href={socials.whatsapp}><span>01</span><h2>WhatsApp</h2><p>Product advice, custom units and order enquiries.</p><ArrowRight/></a><a href={socials.instagram}><span>02</span><h2>Instagram</h2><p>Follow new drops and client transformations.</p><ArrowRight/></a><a href={socials.tiktok}><span>03</span><h2>TikTok</h2><p>Hair inspiration, styling and behind the scenes.</p><ArrowRight/></a></div><div className="locations"><p>Business locations</p><h2>Akure <span>&</span> Lagos</h2><p>Nationwide delivery across Nigeria</p></div></section></Shell>;
}
