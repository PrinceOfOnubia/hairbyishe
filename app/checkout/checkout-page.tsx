"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { Check, LoaderCircle } from "lucide-react";
import { Shell } from "../storefront";
import { useCart } from "../cart-context";
import { formatPriceNGN } from "../data";
import { useCms } from "../cms-context";

export function CheckoutPage() {
  const { items, total, clear } = useCart();
  const { settings } = useCms();
  const [delivery, setDelivery] = useState("DOOR_DELIVERY");
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState<string | null>(null);
  const [copied,setCopied]=useState(false);
  const deliveryFee=delivery==="PARK_PICKUP"?5000:8000;
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        customerName: form.get("customerName"),
        email: form.get("email"),
        phone: form.get("phone"),
        state: form.get("state"),
        city: form.get("city"),
        address: form.get("address"),
        notes: form.get("notes"),
        deliveryMethod: delivery,
        pickupLocation: form.get("pickupLocation"),
        items,
      }),
    });
    const result = await response.json();
    setSubmitting(false);
    if (response.ok) {
      setOrder(result.orderNumber);
      clear();
    } else alert(result.error || "Unable to create order");
  }
  if (order)
    return (
      <Shell>
        <section className="checkout-success">
          <Check />
          <p className="eyebrow">Order {order}</p><h1>Order Placed Successfully.</h1><p>Thank you for shopping with HairByIshe.</p><p>We will verify payment and contact you shortly.</p><div className="success-actions"><Link className="button dark" href="/collections">Continue Shopping</Link><a className="button outline" href={`https://wa.me/${settings.whatsapp}`} target="_blank">Contact on WhatsApp</a></div>
        </section>
      </Shell>
    );
  return (
    <Shell>
      <section className="checkout">
        <div className="checkout-title">
          <p className="eyebrow">Secure guest checkout</p>
          <h1>
            Complete your <em>order.</em>
          </h1>
          <p>No account or signup required.</p>
        </div>
        {items.length === 0 ? (
          <div className="empty">
            <h2>Your bag is empty</h2>
            <Link className="button dark" href="/collections">
              Shop the collection
            </Link>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="checkout-form">
              <section>
                <h2>Customer information</h2>
                <div className="form-grid">
                  <label>
                    Full Name
                    <input required name="customerName" autoComplete="name" />
                  </label>
                  <label>
                    Email Address
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                    />
                  </label>
                  <label>
                    Phone Number
                    <input required name="phone" autoComplete="tel" />
                  </label>
                  <label className="wide">
                    Additional Notes
                    <textarea name="notes" />
                  </label>
                </div>
                <h2>Delivery method</h2>
                <div className="delivery-options">
                  <label>
                    <input
                      type="radio"
                      checked={delivery === "DOOR_DELIVERY"}
                      onChange={() => setDelivery("DOOR_DELIVERY")}
                    />{" "}
                    Door Delivery
                  </label>
                  <label>
                    <input
                      type="radio"
                      checked={delivery === "PARK_PICKUP"}
                      onChange={() => setDelivery("PARK_PICKUP")}
                    />{" "}
                    Park Pickup
                  </label>
                </div>
                {delivery === "DOOR_DELIVERY" && <div className="form-grid delivery-address-fields"><label>Delivery State<input required name="state"/></label><label>Delivery City<input required name="city"/></label><label className="wide">Delivery Address<textarea required name="address" placeholder="House number, street and nearest landmark"/></label></div>}
                {delivery === "PARK_PICKUP" && (
                  <div className="form-grid pickup-fields"><label>Pickup State<input required name="state"/></label><label>Pickup City<input required name="city"/></label><label className="wide">Preferred Pickup Location<input required name="pickupLocation" placeholder="Enter a convenient motor park or pickup point"/></label><input type="hidden" name="address" value="Park pickup"/></div>
                )}
                <div className="shipping-summary"><b>Shipping & returns</b><p>Nationwide Delivery Across Nigeria. International Shipping Available.</p><p>7–14 day return window. Items must be unused and in original packaging and condition.</p></div>
              </section>
              <aside>
                <h2>Your order</h2>
                {items.map((i) => (
                  <p key={`${i.id}-${i.length}-${i.density}`}>
                    {i.quantity} × {i.name}
                    <strong>{formatPriceNGN(i.price * i.quantity)}</strong>
                  </p>
                ))}
                <div className="checkout-breakdown"><p>Product Total <strong>{formatPriceNGN(total)}</strong></p><p>Delivery Fee <strong>{formatPriceNGN(deliveryFee)}</strong></p></div><div className="checkout-total">Final Total <strong>{formatPriceNGN(total+deliveryFee)}</strong></div>
                <div className="bank">
                  <p className="eyebrow">Direct bank transfer</p>
                  <h3>{settings.bankName}</h3>
                  <p>
                    Account Name: <b>{settings.bankAccountName}</b>
                  </p>
                  <div className="account-number-row">
                    <span>Account Number: <b>{settings.bankAccountNumber}</b></span>
                    <button type="button" className="copy-account" onClick={async()=>{await navigator.clipboard.writeText(settings.bankAccountNumber);setCopied(true);setTimeout(()=>setCopied(false),2200)}}>{copied?"Copied ✓":"Copy"}</button>
                  </div>
                  <small>
                    Transfer the exact order total, then click the button below.
                    Your payment will be verified before fulfilment.
                  </small>
                </div>
                <button
                  className="button dark payment-button"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <LoaderCircle className="spin" /> Creating order…
                    </>
                  ) : (
                    "I Have Made Payment"
                  )}
                </button>
                <p className="need-help">
                  Need assistance?
                  <br />
                  Call or WhatsApp:{" "}
                  <a href="https://wa.me/2348038636561">08038636561</a>
                </p>
              </aside>
            </div>
          </form>
        )}
      </section>
    </Shell>
  );
}
