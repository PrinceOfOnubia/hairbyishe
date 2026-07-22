"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Camera,
  ChevronDown,
  Heart,
  Menu,
  MapPin,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Truck,
  Phone,
  X,
} from "lucide-react";
import { categories, formatPriceNGN, products, type Product } from "./data";
import { cartKey, useCart } from "./cart-context";
import { useCms } from "./cms-context";
import { useRouter } from "next/navigation";

export function Announcement() {
  const { settings } = useCms();
  return (
    <div className="announcement">
      <span>
        <Phone /> +234 803 863 6561
      </span>
      <span>
        <Truck /> {settings.deliveryText}
      </span>
    </div>
  );
}

export function Header() {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const { count, wishlist, setOpen } = useCart();
  const { settings } = useCms();
  return (
    <>
      <Announcement />
      <header className="header">
        <button
          className="mobile-icon"
          onClick={() => setMenu(true)}
          aria-label="Open menu"
        >
          <Menu />
        </button>
        <nav className="nav-left">
          <Link href="/">Home</Link>
          <Link href="/collections">Shop</Link>
          <Link href="/about">Our Story</Link>
        </nav>
        <Link href="/" className="wordmark">
          <img
            src="/hairbyishe-logo-transparent.png"
            alt="Hair by Ishe — A World of Quality Hairs"
          />
        </Link>
        <div className="nav-actions">
          <button onClick={() => setSearch(!search)} aria-label="Search">
            <Search />
          </button>
          <Link href="/wishlist" aria-label="Wishlist">
            <Heart />
            {wishlist.length > 0 && <b>{wishlist.length}</b>}
          </Link>
          <button
            className="header-cart"
            onClick={() => setOpen(true)}
            aria-label="Cart"
          >
            <ShoppingBag />
            <b>{count}</b>
          </button>
        </div>
      </header>
      <AnimatePresence>
        {search && (
          <motion.div
            className="searchbar"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 76, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <Search />
            <input
              autoFocus
              placeholder="Search wigs, textures and collections..."
            />
            <button onClick={() => setSearch(false)}>
              <X />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {menu && (
          <motion.aside
            className="mobile-menu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
          >
            <button onClick={() => setMenu(false)}>
              <X />
            </button>
            <Link href="/">Home</Link>
            <Link href="/collections">Shop All</Link>
            <Link href="/about">Our Story</Link>
            <Link href="/contact">Contact</Link>
            <div className="menu-social">
              <a href={settings.instagram}>
                <Camera /> Instagram
              </a>
              <a href={settings.tiktok}>
                <b>♪</b> TikTok
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      <CartDrawer />
    </>
  );
}

export function Footer() {
  const { settings } = useCms();
  return (
    <footer>
      <div className="footer-top">
        <div>
          <Link className="footer-logo" href="/">
            <img src="/hairbyishe-logo-transparent.png" alt="Hair by Ishe" />
          </Link>
          <p>{settings.footerText}</p>
          <div className="socials">
            <a href={settings.instagram}>
              <Camera /> Instagram
            </a>
            <a href={settings.tiktok}>♪ TikTok</a>
          </div>
        </div>
        <div>
          <h4>Explore</h4>
          <Link href="/collections">Shop All</Link>
          <Link href="/about">Our Story</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <h4>Customer Support</h4>
          <a href="tel:08038636561">
            <Phone /> +234 803 863 6561
          </a>
          <a href={`https://wa.me/${settings.whatsapp}`}>
            WhatsApp Available
          </a>
          <p>
            <Truck /> {settings.deliveryText}
          </p>
          <p>
            <MapPin /> {settings.locations.join(" & ")}
          </p>
        </div>
        <div>
          <h4>The Ishe Edit</h4>
          <p>New drops and hair care notes, quietly delivered.</p>
          <div className="newsletter">
            <input placeholder="Email address" />
            <button aria-label="Subscribe">
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 HairByIshe <span><Link href="/privacy-policy">Privacy</Link> · <Link href="/terms-and-conditions">Terms</Link> · <Link href="/delivery-information">Delivery</Link> · <Link href="/returns-policy">Returns</Link></span>
      </div>
    </footer>
  );
}

function CartDrawer() {
  const { items, total, open, setOpen, removeItem, updateQuantity } = useCart();
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            className="drawer-backdrop"
            aria-label="Close cart"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
          >
            <div className="drawer-head">
              <div>
                <p className="eyebrow">Your selection</p>
                <h2>Shopping bag</h2>
              </div>
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>
            <div className="drawer-items">
              {items.length === 0 ? (
                <div className="drawer-empty">
                  <ShoppingBag />
                  <p>Your bag is currently empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <article key={cartKey(item)}>
                    <img src={item.image} alt={item.name} />
                    <div>
                      <b>{item.name}</b>
                      <small>
                        {item.length} · {item.density}
                      </small>
                      <strong>{formatPriceNGN(item.price)}</strong>
                      <div className="mini-qty">
                        <button
                          onClick={() =>
                            updateQuantity(cartKey(item), item.quantity - 1)
                          }
                        >
                          <Minus />
                        </button>
                        {item.quantity}
                        <button
                          onClick={() =>
                            updateQuantity(cartKey(item), item.quantity + 1)
                          }
                        >
                          <Plus />
                        </button>
                      </div>
                    </div>
                    <button
                      className="remove"
                      onClick={() => removeItem(cartKey(item))}
                    >
                      Remove
                    </button>
                  </article>
                ))
              )}
            </div>
            {items.length > 0 && (
              <div className="drawer-total">
                <p>
                  Subtotal <strong>{formatPriceNGN(total)}</strong>
                </p>
                <Link
                  className="button dark"
                  href="/cart"
                  onClick={() => setOpen(false)}
                >
                  View bag & checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const {wishlist,toggleWishlist}=useCart();
  const liked=wishlist.includes(product.id);
  return (
    <motion.article
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
    >
      <div className="product-image">
        <Link href={`/products/${product.id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        {product.tag && <span className="tag">{product.tag}</span>}
        <button
          className={`heart ${liked ? "active" : ""}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label="Save to wishlist"
        >
          <Heart fill={liked ? "black" : "none"} />
        </button>
        <Link className="quick" href={`/products/${product.id}`}>
          Quick view
        </Link>
      </div>
      <div className="product-info">
        <p>{product.category}</p>
        <Link href={`/products/${product.id}`}>{product.name}</Link>
        <strong>{formatPriceNGN(product.price)}</strong>
      </div>
    </motion.article>
  );
}

export function HomePage() {
  const {
    products: cmsProducts,
    content,
    settings,
    testimonials: cmsTestimonials,
  } = useCms();
  const displayProducts = cmsProducts.length ? cmsProducts : products;
  return (
    <Shell>
      <section className="hero">
        <img
          src="/hero-hairbyishe.jpg"
          alt="HairByIshe premium body wave hair"
        />
        <div className="hero-copy">
          <p className="eyebrow">The Signature Collection</p>
          <h1>{content.heroTitle}</h1>
          <p>{content.heroSubtitle}</p>
          <div>
            <Link className="button light" href="/collections">
              {content.heroPrimaryButton} <ArrowRight />
            </Link>
            <Link className="text-link" href="/contact">
              {content.heroSecondaryButton}
            </Link>
          </div>
        </div>
        <div className="hero-note">
          <span>01</span>
          <p>
            Luxury hair collections
            <br />
            delivered nationwide.
          </p>
        </div>
      </section>
      <section className="intro">
        <p className="eyebrow">Our promise</p>
        <h2>
          Beautiful hair should feel
          <br />
          effortless, personal, <em>yours.</em>
        </h2>
        <p>
          From raw textures to ready-to-wear units, every HairByIshe piece is
          selected for softness, movement and lasting quality.
        </p>
      </section>
      <section className="products-section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Curated for you</p>
            <h2>Signature pieces</h2>
          </div>
          <Link href="/collections">
            View all <ArrowRight />
          </Link>
        </div>
        <div className="product-grid">
          {displayProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
      <section className="category-section">
        <div className="category-visual">
          <img
            src={(displayProducts[2] || displayProducts[0]).image}
            alt="Curly hair collection"
          />
          <span>Raw. Real. Remarkable.</span>
        </div>
        <div className="category-list">
          <p className="eyebrow">Find your texture</p>
          <h2>Shop by category</h2>
          {categories.map((c, i) => (
            <Link
              href={`/collections?category=${encodeURIComponent(c)}`}
              key={c}
            >
              <span>0{i + 1}</span>
              {c}
              <ArrowRight />
            </Link>
          ))}
        </div>
      </section>
      <section className="why">
        <p className="eyebrow">The HairByIshe standard</p>
        <h2>
          Quiet luxury,
          <br />
          <em>made to last.</em>
        </h2>
        <div className="why-grid">
          <article>
            <span>01</span>
            <h3>Premium sourcing</h3>
            <p>
              Quality human hair selected for softness, fullness and longevity.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Personal finish</h3>
            <p>
              Small-batch units finished with the care of a trusted personal
              stylist.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Made convenient</h3>
            <p>
              Available in Akure and Lagos, with reliable nationwide delivery.
            </p>
          </article>
        </div>
      </section>
      <Testimonials items={cmsTestimonials} />
      <section className="insta">
        <div className="section-head">
          <div>
            <p className="eyebrow">Follow the journey</p>
            <h2>@hairbyishe</h2>
          </div>
          <a href={settings.instagram}>
            View Instagram <ArrowRight />
          </a>
        </div>
        <div className="insta-grid">
          {displayProducts.map((p, i) => (
            <a key={p.id} href={settings.instagram}>
              <img src={p.image} alt={`HairByIshe gallery ${i + 1}`} />
              <Camera />
            </a>
          ))}
        </div>
      </section>
      <section className="delivery">
        <Truck />
        <div>
          <p className="eyebrow">From us to you</p>
          <h2>
            Nationwide delivery
            <br />
            across Nigeria.
          </h2>
        </div>
        <p>
          Shop from anywhere. We package each order carefully and keep you
          updated until it arrives.
        </p>
        <Link className="button light" href="/contact">
          Delivery enquiries <ArrowRight />
        </Link>
      </section>
    </Shell>
  );
}

const testimonials = [
  "Loved the quality.",
  "Exactly what I ordered.",
  "Fast delivery and premium hair.",
  "One of the best hair vendors.",
];
const testimonialNames=["Chioma Tiktok.","Temitope O.","Amaka E.","Adebimpe A."];
function Testimonials({
  items,
}: {
  items: Array<{ id: string; name: string; location: string; quote: string }>;
}) {
  const quotes = items.length ? items.map((item) => item.quote) : testimonials;
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(
      () => setSlide((value) => (value + 1) % quotes.length),
      5500,
    );
    return () => clearInterval(timer);
  }, [quotes.length]);
  return (
    <section className="testimonials">
      <p className="eyebrow">Client love</p>
      <div
        className="testimonial-track"
        style={{ "--slide": slide } as React.CSSProperties}
      >
        {quotes.map((quote, index) => (
          <article key={quote}>
            <div>★★★★★</div>
            <blockquote>“{quote}”</blockquote>
            <p>— {items[index]?.name||testimonialNames[index%testimonialNames.length]}</p>
          </article>
        ))}
      </div>
      <div className="testimonial-dots">
        {quotes.map((_, index) => (
          <button
            aria-label={`Show testimonial ${index + 1}`}
            className={slide === index ? "active" : ""}
            onClick={() => setSlide(index)}
            key={index}
          />
        ))}
      </div>
    </section>
  );
}

export function CollectionsPage() {
  const { products: cmsProducts } = useCms();
  const collectionProducts = cmsProducts.length ? cmsProducts : products;
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [query, setQuery] = useState("");
  const visible = useMemo(
    () =>
      collectionProducts
        .filter(
          (p) =>
            (category === "All" || p.category === category) &&
            p.name.toLowerCase().includes(query.toLowerCase()),
        )
        .sort((a, b) =>
          sort === "low"
            ? a.price - b.price
            : sort === "high"
              ? b.price - a.price
              : 0,
        ),
    [category, sort, query, collectionProducts],
  );
  return (
    <Shell>
      <section className="page-hero">
        <p className="eyebrow">The collections</p>
        <h1>
          Find your <em>signature.</em>
        </h1>
        <p>
          Premium textures. Considered construction. Hair made for real life.
        </p>
      </section>
      <section className="collection-layout">
        <aside>
          <h3>Categories</h3>
          {["All", ...categories].map((c) => (
            <button
              className={category === c ? "selected" : ""}
              key={c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </aside>
        <div className="collection-main">
          <div className="collection-tools">
            <label>
              <Search />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
              />
            </label>
            <span>{visible.length} pieces</span>
            <label>
              Sort{" "}
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
              <ChevronDown />
            </label>
          </div>
          <div className="product-grid">
            {visible.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </Shell>
  );
}

export function ProductPage({ product }: { product: Product }) {
  const [length, setLength] = useState(product.lengths?.[0]||'18"');
  const [density, setDensity] = useState(product.densities?.[0]||"180%");
  const [qty, setQty] = useState(1);
  const router=useRouter();
  const { addItem } = useCart();
  const { products: cmsProducts, settings } = useCms();
  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem("recent") || "[]");
    localStorage.setItem(
      "recent",
      JSON.stringify(
        [product.id, ...recent.filter((x: string) => x !== product.id)].slice(
          0,
          4,
        ),
      ),
    );
  }, [product.id]);
  const message = `Hello HairByIshe,\n\nI would like to order:\n\nProduct:\n${product.name}\n\nPrice:\n${formatPriceNGN(product.price)}\n\nLength:\n${length}\n\nDensity:\n${density}\n\nQuantity:\n${qty}\n\nPlease assist me with my order.`;
  const add = () => addItem(product, { length, density, quantity: qty });
  return (
    <Shell>
      <section className="product-page">
        <div className="gallery">
          {(product.media?.length?product.media:[{url:product.image,type:"image"}]).map((item,index)=>item.type==="video"?<video key={item.url} src={item.url} controls playsInline aria-label={`${product.name} video ${index+1}`}/>:<img key={item.url} src={item.url} alt={`${product.name} view ${index+1}`}/>)}
        </div>
        <div className="product-detail">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <div className="rating">
            <span>★★★★★</span> 4.9 · 18 reviews
          </div>
          <strong className="price">{formatPriceNGN(product.price)}</strong>
          <p>{product.description}</p>
          <fieldset>
            <legend>
              Hair length <b>{length}</b>
            </legend>
            <div className="options">
              {(product.lengths?.length?product.lengths:['16"', '18"', '20"', '22"', '24"']).map((v) => (
                <button
                  className={length === v ? "selected" : ""}
                  onClick={() => setLength(v)}
                  key={v}
                >
                  {v}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>
              Density <b>{density}</b>
            </legend>
            <div className="options">
              {(product.densities?.length?product.densities:["150%", "180%", "200%"]).map((v) => (
                <button
                  className={density === v ? "selected" : ""}
                  onClick={() => setDensity(v)}
                  key={v}
                >
                  {v}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="buy-row">
            <div className="qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>
                <Minus />
              </button>
              {qty}
              <button onClick={() => setQty(qty + 1)}>
                <Plus />
              </button>
            </div>
            <button className="button dark" onClick={add}>
              Add to cart
            </button>
          </div>
          <button className="button outline" onClick={() => {add();setTimeout(()=>router.push("/checkout"),0)}}>
            Buy now
          </button>
          <a
            className="button whatsapp-order"
            href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(message)}`}
            target="_blank"
          >
            Order via WhatsApp <ArrowRight />
          </a>
          <div className="delivery-note">
            <Truck />
            <div>
              <b>Nationwide delivery available</b>
              <p>Carefully packaged and delivered across Nigeria.</p>
            </div>
          </div>
          <details open>
            <summary>
              Care & maintenance <Plus />
            </summary>
            <p>
              Store on a wig stand, detangle gently and use professional care
              products.
            </p>
          </details>
          <details open>
            <summary>
              Delivery information <Plus />
            </summary>
            <p>Delivery timelines vary by location and unit availability.</p>
          </details>
          <details open><summary>Shipping & returns <Plus /></summary><p>Nationwide Delivery Across Nigeria. International Shipping Available.</p><p>7–14 day returns for unused items in original packaging and condition. Customized, colored or used products are non-returnable unless defective.</p></details>
        </div>
      </section>
      <section className="related products-section">
        <div className="section-head">
          <h2>You may also like</h2>
        </div>
        <div className="product-grid">
          {(cmsProducts.length ? cmsProducts : products)
            .filter((p) => p.id !== product.id)
            .slice(0, 3)
            .map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
        </div>
      </section>
    </Shell>
  );
}

export function SimplePage({
  type,
}: {
  type: "about" | "contact" | "cart" | "wishlist";
}) {
  const { settings, products: cmsProducts } = useCms();
  const displayProducts = cmsProducts.length ? cmsProducts : products;
  if (type === "cart") return <CartPage />;
  if (type === "wishlist") return <WishlistPage products={displayProducts}/>;
  if (type === "about")
    return (
      <Shell>
        <section className="story">
          <div>
            <p className="eyebrow">The HairByIshe story</p>
            <h1>
              Luxury hair,
              <br />
              <em>made personal.</em>
            </h1>
          </div>
          <p>
            HairByIshe is a premium Nigerian hair brand offering human hair
            wigs, raw hair, ready-to-wear units and custom wig services. We
            believe luxury is not about being loud—it is about quality you can
            feel, thoughtful service and hair that lets you move through life
            with confidence.
            <br />
            <br />
            Available in Akure & Lagos. Delivery nationwide.
          </p>
        </section>
        <section className="story-image">
          <img src={displayProducts[0].image} alt="HairByIshe craft" />
          <div>
            <p className="eyebrow">Small by design</p>
            <h2>Care in every detail.</h2>
            <p>
              We are building slowly and thoughtfully, one beautiful unit and
              one happy client at a time.
            </p>
          </div>
        </section>
      </Shell>
    );
  return (
    <Shell>
      <section className="contact">
        <p className="eyebrow">We would love to hear from you</p>
        <h1>
          Let’s talk <em>hair.</em>
        </h1>
        <div className="contact-phone">
          <p>
            Phone: <a href="tel:08038636561">08038636561</a>
          </p>
          <p>
            WhatsApp:{" "}
            <a href={`https://wa.me/${settings.whatsapp}`}>+234 803 863 6561</a>
          </p>
        </div>
        <div className="contact-grid">
          <a href={`https://wa.me/${settings.whatsapp}`}>
            <span>01</span>
            <h2>WhatsApp</h2>
            <p>Product advice, custom units and order enquiries.</p>
            <b>Click to Chat on WhatsApp</b>
            <ArrowRight />
          </a>
          <a href={settings.instagram}>
            <span>02</span>
            <h2>Instagram</h2>
            <p>Follow new drops and client transformations.</p>
            <ArrowRight />
          </a>
          <a href={settings.tiktok}>
            <span>03</span>
            <h2>TikTok</h2>
            <p>Hair inspiration, styling and behind the scenes.</p>
            <ArrowRight />
          </a>
        </div>
        <div className="locations">
          <p>Business locations</p>
          <h2>
            Akure <span>&</span> Lagos
          </h2>
          <p>Nationwide delivery across Nigeria</p>
        </div>
      </section>
    </Shell>
  );
}

function WishlistPage({products}:{products:Product[]}){const {wishlist}=useCart();const saved=products.filter(product=>wishlist.includes(product.id));return <Shell><section className="simple"><p className="eyebrow">Saved pieces</p><h1>Your <em>wishlist.</em></h1>{saved.length?<div className="product-grid">{saved.map((product,index)=><ProductCard key={product.id} product={product} index={index}/>)}</div>:<div className="empty"><Heart/><h2>Keep your favourites close</h2><p>Tap the heart on any piece to save it here.</p><Link className="button dark" href="/collections">Browse the collection</Link></div>}</section></Shell>}

function CartPage() {
  const { items, total, removeItem, updateQuantity } = useCart();
  const { settings } = useCms();
  const message = `Hello HairByIshe,\n\nI would like to place an order.\n\nItems:\n${items.map((i) => `${i.quantity} × ${i.name} (${i.length}, ${i.density}) — ${formatPriceNGN(i.price * i.quantity)}`).join("\n")}\n\nTotal:\n${formatPriceNGN(total)}\n\nPlease assist me with payment and delivery.`;
  return (
    <Shell>
      <section className="simple cart-page">
        <p className="eyebrow">Your selection</p>
        <h1>
          Your bag is <em>waiting.</em>
        </h1>
        {items.length === 0 ? (
          <div className="empty">
            <ShoppingBag />
            <h2>Your bag is currently empty</h2>
            <p>Discover a signature unit made for you.</p>
            <Link className="button dark" href="/collections">
              Explore the collection
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div>
              {items.map((item) => (
                <article className="cart-item" key={cartKey(item)}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h2>{item.name}</h2>
                    <p>
                      {item.length} · {item.density}
                    </p>
                    <strong>{formatPriceNGN(item.price)}</strong>
                    <div className="mini-qty">
                      <button
                        onClick={() =>
                          updateQuantity(cartKey(item), item.quantity - 1)
                        }
                      >
                        <Minus />
                      </button>
                      {item.quantity}
                      <button
                        onClick={() =>
                          updateQuantity(cartKey(item), item.quantity + 1)
                        }
                      >
                        <Plus />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(cartKey(item))}>
                    Remove
                  </button>
                </article>
              ))}
            </div>
            <aside>
              <h2>Order summary</h2>
              <p>
                Subtotal <strong>{formatPriceNGN(total)}</strong>
              </p>
              <small>Delivery cost is confirmed based on your location.</small>
              <Link className="button dark" href="/checkout">
                Continue to checkout
              </Link>
              <a
                className="button outline"
                href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(message)}`}
                target="_blank"
              >
                Checkout via WhatsApp
              </a>
            </aside>
          </div>
        )}
      </section>
    </Shell>
  );
}
