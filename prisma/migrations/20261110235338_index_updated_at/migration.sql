-- DropIndex
DROP INDEX "Product_createdAt_idx";

-- CreateIndex
CREATE INDEX "Coupon_updatedAt_idx" ON "Coupon"("updatedAt");

-- CreateIndex
CREATE INDEX "Product_updatedAt_idx" ON "Product"("updatedAt");
