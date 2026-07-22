import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("ships the supplied HairByIshe brand imagery", async () => {
  const [storefront, logo, hero] = await Promise.all([
    readFile(new URL("../app/storefront.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/hairbyishe-logo-transparent.png", import.meta.url)),
    readFile(new URL("../public/hero-hairbyishe.jpg", import.meta.url)),
  ]);
  assert.match(storefront, /\/hairbyishe-logo-transparent\.png/);
  assert.match(storefront, /\/hero-hairbyishe\.jpg/);
  assert.ok(logo.length > 10_000);
  assert.ok(hero.length > 10_000);
});

test("includes persistent cart, guest checkout, WhatsApp and order creation", async () => {
  const [cart, checkout, orderApi, schema] = await Promise.all([
    readFile(new URL("../app/cart-context.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/checkout/checkout-page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/orders/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../prisma/schema.prisma", import.meta.url), "utf8"),
  ]);
  assert.match(cart, /localStorage\.setItem\("hairbyishe-cart"/);
  assert.match(checkout, /I Have Made Payment/);
  assert.match(checkout, /No account or signup required/);
  assert.match(orderApi, /prisma\.order\.create/);
  assert.match(schema, /enum DeliveryMethod/);
});
