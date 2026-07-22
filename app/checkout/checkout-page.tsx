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
          <p className="eyebrow">Order received</p>
          <h1>Thank you.</h1>
          <p>
            Your order <b>{order}</b> is marked{" "}
            <b>Payment Pending Verification</b>. We will contact you after
            confirming your transfer.
          </p>
          <Link className="button dark" href="/collections">
            Continue shopping
          </Link>
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
                  <label>
                    State
                    <input required name="state" />
                  </label>
                  <label>
                    City
                    <input required name="city" />
                  </label>
                  <label className="wide">
                    Full Address
                    <textarea required name="address" />
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
                {delivery === "PARK_PICKUP" && (
                  <label className="pickup">
                    Pickup location
                    <select name="pickupLocation" required>
                      <option>Akure</option>
                      <option>Lagos</option>
                    </select>
                  </label>
                )}
              </section>
              <aside>
                <h2>Your order</h2>
                {items.map((i) => (
                  <p key={`${i.id}-${i.length}-${i.density}`}>
                    {i.quantity} × {i.name}
                    <strong>{formatPriceNGN(i.price * i.quantity)}</strong>
                  </p>
                ))}
                <div className="checkout-total">
                  Total <strong>{formatPriceNGN(total)}</strong>
                </div>
                <div className="bank">
                  <p className="eyebrow">Direct bank transfer</p>
                  <h3>{settings.bankName}</h3>
                  <p>
                    Account Name: <b>{settings.bankAccountName}</b>
                  </p>
                  <p>
                    Account Number: <b>{settings.bankAccountNumber}</b>
                  </p>
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
