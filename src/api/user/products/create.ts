import type { Token } from "@/types/auth";
import { ProductSchema } from "@/api/products";
import { fetchYazio } from "@/utils/fetch";
import { z } from "zod";

export const AddProductOptionsSchema = ProductSchema.pick({
  id: true,
  name: true,
  category: true,
  base_unit: true,
  is_private: true,
  nutrients: true,
  servings: true,
});

export type AddProductOptions = z.infer<
  typeof AddProductOptionsSchema
>;

/**
 * Create a new custom user product.
 *
 * @param token - Token to use for authentication.
 * @param product - The product details to create.
 */
export const addProduct = async (
  token: Token,
  product: AddProductOptions
): Promise<void> =>
  fetchYazio<void>("/user/products", {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      Authorization: `Bearer ${token.access_token}`,
      "Content-Type": "application/json",
    },
  });
