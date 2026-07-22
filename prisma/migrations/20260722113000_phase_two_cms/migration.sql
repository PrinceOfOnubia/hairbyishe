ALTER TABLE "StoreSettings"
ADD COLUMN "businessName" TEXT NOT NULL DEFAULT 'HairByIshe',
ADD COLUMN "bankName" TEXT NOT NULL DEFAULT 'Wema Bank',
ADD COLUMN "bankAccountName" TEXT NOT NULL DEFAULT 'HairByIshe Enterprises',
ADD COLUMN "bankAccountNumber" TEXT NOT NULL DEFAULT '1234567890',
ADD COLUMN "footerText" TEXT NOT NULL DEFAULT 'Thoughtfully sourced hair. Beautifully made units. Made personal, just for you.';
