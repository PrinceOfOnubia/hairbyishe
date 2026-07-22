UPDATE "ProductImage" SET "url"=CASE (SELECT "slug" FROM "Product" WHERE "Product"."id"="ProductImage"."productId")
WHEN 'luxury-bone-straight-wig' THEN '/product-bone-straight.png'
WHEN 'hd-frontal-body-wave' THEN '/product-body-wave.png'
WHEN 'raw-vietnamese-curly' THEN '/product-raw-curly.png'
WHEN 'ready-to-wear-unit' THEN '/product-ready-to-wear.png'
ELSE "url" END
WHERE "position"=0;
