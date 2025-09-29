import { BASE_URL } from "@/lib/constants";
import { navLink } from "@/lib/constants"; // adjust path if needed
import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ✅ Convert navigation links to sitemap routes
  const staticRoutes = navLink.map((link) => ({
    url: link.href,
    priority: 1,
    changeFrequency: "monthly",
  }));

  // ✅ Fetch dynamic product data
  const response = await fetch(`${BASE_URL}/api/products/`);
  const data = await response.json();
  const products = (data.products || []) as { slug: string }[];

  // ✅ Dynamic product URLs
  const productRoutes = products.map((product) => ({
    url: `/product/${product.slug}`,
    changeFrequency: "weekly",
  }));

  // ✅ Merge and format
  const allRoutes = [...staticRoutes, ...productRoutes];

  return allRoutes.map((route) => ({
    url: `${BASE_URL}${route.url}`,
    lastModified: new Date().toISOString(),
  }));
}
