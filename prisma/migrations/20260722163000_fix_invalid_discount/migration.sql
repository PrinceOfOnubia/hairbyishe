UPDATE "Product" SET "discountPrice" = NULL WHERE "discountPrice" IS NOT NULL AND "discountPrice" <= 0;
