import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  price: z.string().min(1, "Price is required"),
  description: z.string().optional(),
  is_publish: z.boolean(),
  is_featured: z.boolean(),
  view_price: z.boolean(),
  thumbnail: z.string().refine(
    (val) => {
      if (!val) return false;
      // Base64 string roughly 33% larger than original file size
      const sizeInKB = (val.length * 3) / 4 / 1024;
      return sizeInKB <= 1000;
    },
    { message: "Thumbnail must be less than 1000KB" }
  ),
});

export type ProductSchema = z.infer<typeof productSchema>;
