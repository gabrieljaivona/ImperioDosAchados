-- Converte Store (enum) em texto livre preservando os dados existentes.
ALTER TABLE "Coupon" ALTER COLUMN "store" TYPE TEXT USING "store"::text;
ALTER TABLE "Product" ALTER COLUMN "store" TYPE TEXT USING "store"::text;

-- DropEnum
DROP TYPE "Store";
