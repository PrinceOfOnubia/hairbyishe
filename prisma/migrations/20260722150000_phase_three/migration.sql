ALTER TABLE "Product" ADD COLUMN "lengths" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "densities" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "colors" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "ProductImage" ADD COLUMN "type" TEXT NOT NULL DEFAULT 'image';
ALTER TABLE "StoreSettings" ADD COLUMN "defaultProductDescription" TEXT NOT NULL DEFAULT 'Premium quality hair.\n\nSoft, silky and long-lasting.\n\nFeatures:\n\n✓ Minimal shedding\n✓ Tangle free\n✓ Natural hairline\n✓ Beginner friendly\n✓ Luxury quality\n\nDelivery available nationwide and internationally.';

UPDATE "Product" SET "lengths"=ARRAY['10"','12"','14"','16"','18"','20"','22"','24"','26"','28"','30"'], "densities"=ARRAY['150%','180%','200%','250%'], "colors"=ARRAY['Natural Black','Jet Black','Brown','Blonde','Burgundy','Custom Color'];
INSERT INTO "ProductImage" ("id","url","alt","position","type","productId") SELECT 'phase3-'||"id", CASE "slug"
WHEN 'luxury-bone-straight-wig' THEN 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1400&q=92'
WHEN 'hd-frontal-body-wave' THEN 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1400&q=92'
WHEN 'raw-vietnamese-curly' THEN 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=92'
ELSE 'https://images.unsplash.com/photo-1596704017254-9757adc3a87e?auto=format&fit=crop&w=1400&q=92' END, "name", 0, 'image', "id" FROM "Product" WHERE NOT EXISTS (SELECT 1 FROM "ProductImage" WHERE "ProductImage"."productId"="Product"."id");
UPDATE "Testimonial" SET "name"=CASE "position" WHEN 0 THEN 'Chioma Tiktok.' WHEN 1 THEN 'Temitope O.' WHEN 2 THEN 'Amaka E.' ELSE 'Adebimpe A.' END;
