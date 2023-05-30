import { Product } from "@prisma/client";
import { db } from "./db";

export async function getProductData(id: string): Promise<Product | null> {
  const product = await db.product.findUnique({
    where: { id },
  });

  return product;
}