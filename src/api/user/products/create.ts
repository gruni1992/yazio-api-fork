import type { Token } from "@/types/auth";
import { NutrientsSchema, ProductSchema } from "@/api/products";
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
}).extend({
  nutrients: NutrientsSchema.partial()
    .required({
      "energy.energy": true,
      "nutrient.fat": true,
      "nutrient.saturated": true,
      "nutrient.carb": true,
      "nutrient.sugar": true,
      "nutrient.protein": true,
      "nutrient.salt": true,
    }),
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
