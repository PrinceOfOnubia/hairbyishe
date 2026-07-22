# HairByIshe

A luxury-minimal ecommerce storefront and admin studio for HairByIshe. Built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, PostgreSQL and Prisma.

## Local setup

1. Copy `.env.example` to `.env` and fill in PostgreSQL, Cloudinary and store contact values.
2. Run `npm install`.
3. Run `npm run db:generate` and `npm run db:migrate`.
4. Seed sample products with `npm run db:seed`.
5. Start the site with `npm run dev`.

## Admin credentials

The `/admin` route is protected by platform authentication when deployed with Sites. For a Vercel deployment, connect your preferred auth provider and allow only the address configured as `ADMIN_EMAIL`; all admin mutations must verify the same email server-side.

## Images

The data model supports multiple product images. Configure the Cloudinary variables in `.env`, then wire the upload action to the media library in `/admin`.

## Deployment

### Vercel + PostgreSQL

Create a PostgreSQL database, add the `.env.example` variables in Vercel, run Prisma migrations against the production database, and deploy the repository. Set `NEXT_PUBLIC_SITE_URL` to the production domain.

### Included platform preview

The project also includes `.openai/hosting.json` for a managed Sites preview with structured data and media bindings.

## Storefront routes

- `/` boutique homepage
- `/collections` searchable and sortable catalogue
- `/products/[slug]` product details and schema.org markup
- `/about`, `/contact`, `/cart`, `/wishlist`
- `/admin` protected content, product, order and settings dashboard
