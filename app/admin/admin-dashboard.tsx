"use client";
import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  FileText,
  Image,
  LayoutDashboard,
  Menu,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  X,
} from "lucide-react";
import { formatPriceNGN, products } from "../data";

const nav = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "Products", icon: Package },
  { name: "Orders", icon: ShoppingBag },
  { name: "Content", icon: FileText },
  { name: "Media", icon: Image },
  { name: "Settings", icon: Settings },
];
type AdminOrder = { id:string; orderNumber:string; customerName:string; email:string; phone:string; state:string; city:string; address:string; notes:string; deliveryMethod:string; pickupLocation:string|null; paymentStatus:string; status:string; subtotal:number; deliveryFee:number; createdAt:string; updatedAt:string; items:Array<{id:string;quantity:number;price:number;length:string|null;density:string|null;product:{name:string}}> };
export function AdminDashboard({ email, orders }: { email: string; orders: AdminOrder[] }) {
  const [active, setActive] = useState("Overview");
  const [drawer, setDrawer] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [uploads, setUploads] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  async function uploadImage(file?: File) {
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.set("file", file);
    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: data,
    });
    const result = await response.json();
    if (response.ok) setUploads((items) => [result.url, ...items]);
    else alert(result.error || "Upload failed");
    setUploading(false);
  }
  return (
    <div className="admin-shell">
      <aside className={drawer ? "open" : ""}>
        <button className="admin-close" onClick={() => setDrawer(false)}>
          <X />
        </button>
        <Link href="/" className="admin-logo">
          HAIRBYISHE
        </Link>
        <p>Studio admin</p>
        <nav>
          {nav.map(({ name, icon: Icon }) => (
            <button
              className={active === name ? "active" : ""}
              onClick={() => {
                setActive(name);
                setDrawer(false);
              }}
              key={name}
            >
              <Icon />
              {name}
            </button>
          ))}
        </nav>
        <div className="admin-user">
          <span>HI</span>
          <div>
            <b>{email.split("@")[0]}</b>
            <small>{email}</small>
          </div>
        </div>
      </aside>
      <main>
        <header>
          <button className="admin-menu" onClick={() => setDrawer(true)}>
            <Menu />
          </button>
          <div>
            <p>HairByIshe studio</p>
            <h1>{active}</h1>
          </div>
          <div className="admin-actions">
            <button>
              <Search />
            </button>
            <Link href="/">View store ↗</Link>
          </div>
        </header>
        {active === "Overview" && (
          <>
            <section className="metrics">
              <article>
                <p>Total sales</p>
                <h2>{formatPriceNGN(orders.reduce((sum, order) => sum + order.subtotal, 0))}</h2>
                <span>All guest checkout orders</span>
              </article>
              <article>
                <p>Orders</p>
                <h2>{orders.length}</h2>
                <span>{orders.filter(order => order.status === "PENDING").length} need attention</span>
              </article>
              <article>
                <p>Products</p>
                <h2>{products.length}</h2>
                <span>All products active</span>
              </article>
              <article>
                <p>Low stock</p>
                <h2>2</h2>
                <span>Review inventory</span>
              </article>
            </section>
            <section className="admin-grid">
              <div className="admin-panel">
                <div className="panel-title">
                  <h3>Recent orders</h3>
                  <button onClick={() => setActive("Orders")}>View all</button>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Customer</th>
                      <th>Status</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>{orders.slice(0, 3).map(order => <tr key={order.id}><td>#{order.orderNumber}</td><td>{order.customerName}</td><td><i>{order.status}</i></td><td>{formatPriceNGN(order.subtotal + order.deliveryFee)}</td></tr>)}</tbody>
                </table>
              </div>
              <div className="admin-panel">
                <div className="panel-title">
                  <h3>Store pulse</h3>
                  <BarChart3 />
                </div>
                <div className="chart">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <div className="chart-labels">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </section>
          </>
        )}
        {active === "Products" && (
          <section className="admin-panel full">
            <div className="panel-title">
              <div>
                <h3>Products</h3>
                <p>Manage inventory, pricing and collection visibility.</p>
              </div>
              <button
                className="admin-primary"
                onClick={() => setShowNew(true)}
              >
                <Plus /> New product
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Inventory</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td className="product-cell">
                      <img src={p.image} alt="" />
                      <b>{p.name}</b>
                    </td>
                    <td>{p.category}</td>
                    <td>12 in stock</td>
                    <td>{formatPriceNGN(p.price)}</td>
                    <td>
                      <i>Active</i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
        {active === "Orders" && (
          <section className="admin-panel full">
            <div className="panel-title">
              <div>
                <h3>Orders</h3>
                <p>Track fulfilment and payment status.</p>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Delivery</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>{orders.map(order => <tr key={order.id}><td>#{order.orderNumber}</td><td><b>{order.customerName}</b><br/><small>{order.email}<br/>{order.items.map(item => `${item.quantity}× ${item.product.name}`).join(", ")}</small></td><td>{order.phone}</td><td>{order.deliveryMethod === "PARK_PICKUP" ? `Park Pickup — ${order.pickupLocation}` : `${order.address}, ${order.city}, ${order.state}`}</td><td>{order.paymentStatus.replaceAll("_", " ")}</td><td><i>{order.status}</i></td></tr>)}</tbody>
            </table>
          </section>
        )}
        {active === "Content" && (
          <section className="admin-panel full">
            <div className="panel-title">
              <div>
                <h3>Homepage content</h3>
                <p>
                  Update the words and visual stories your clients see first.
                </p>
              </div>
              <button className="admin-primary">Save changes</button>
            </div>
            <div className="content-form">
              <label>
                Hero eyebrow
                <input defaultValue="The Signature Collection" />
              </label>
              <label>
                Hero title
                <textarea defaultValue="Hair that feels like you." />
              </label>
              <label>
                Delivery text
                <textarea defaultValue="Nationwide delivery across Nigeria." />
              </label>
              <label>
                Testimonials
                <textarea defaultValue="The hair was exactly what I hoped for—soft, full and beautifully finished." />
              </label>
            </div>
          </section>
        )}
        {active === "Media" && (
          <section className="admin-panel full">
            <div className="panel-title">
              <div>
                <h3>Media library</h3>
                <p>
                  Upload product images, banners and Instagram gallery content.
                </p>
              </div>
              <label className="admin-primary upload-button">
                <Plus /> {uploading ? "Uploading…" : "Upload image"}
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploading}
                  onChange={(e) => uploadImage(e.target.files?.[0])}
                />
              </label>
            </div>
            <div className="media-grid">
              {uploads.map((url) => (
                <img key={url} src={url} alt="Uploaded HairByIshe media" />
              ))}
              {products.map((p) => (
                <img key={p.id} src={p.image} alt={p.name} />
              ))}
            </div>
          </section>
        )}
        {active === "Settings" && (
          <section className="admin-panel full">
            <div className="panel-title">
              <div>
                <h3>Store settings</h3>
                <p>Business information and social links.</p>
              </div>
              <button className="admin-primary">Save settings</button>
            </div>
            <div className="content-form">
              <label>
                Pickup Locations
                <input defaultValue="Akure, Lagos" />
              </label>
              <label>
                Instagram
                <input defaultValue="https://instagram.com/hairbyishe" />
              </label>
              <label>
                TikTok
                <input defaultValue="https://tiktok.com/@hairbyishe_2" />
              </label>
              <label>
                Business Phone
                <input defaultValue="08038636561" />
              </label>
              <label>
                WhatsApp Number
                <input defaultValue="08038636561" />
              </label>
            </div>
          </section>
        )}
      </main>
      {showNew && (
        <div className="admin-modal">
          <form>
            <button type="button" onClick={() => setShowNew(false)}>
              <X />
            </button>
            <p>New product</p>
            <h2>Add a beautiful new piece.</h2>
            <label>
              Product name
              <input placeholder="e.g. HD Closure Bob" />
            </label>
            <div>
              <label>
                Category
                <select>
                  {[
                    "Lace Wigs",
                    "Frontal Wigs",
                    "Closure Wigs",
                    "Bone Straight",
                    "Raw Hair",
                  ].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label>
                Price (₦)
                <input type="number" placeholder="150000" />
              </label>
            </div>
            <label>
              Product images
              <input type="file" multiple />
            </label>
            <div className="form-checks">
              <label>
                <input type="checkbox" /> Featured product
              </label>
              <label>
                <input type="checkbox" /> Best seller
              </label>
            </div>
            <button
              type="button"
              className="admin-primary"
              onClick={() => setShowNew(false)}
            >
              Create product
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
