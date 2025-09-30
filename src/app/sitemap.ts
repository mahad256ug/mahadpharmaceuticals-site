import type { MetadataRoute } from "next";

// components
import { BASE_URL } from "@/lib/constants";
import { navLink } from "@/lib/constants";
import { fetchProducts } from "@/fetchers/products";

type routeType = {
  url: string;
  priority: number;
  changeFrequency:
    | "monthly"
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "yearly"
    | "never";
}[];

export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: routeType = navLink.map((link) => ({
    url: link.href,
    priority: 1,
    changeFrequency: "monthly",
  }));

  let products: { slug: string }[] = [];
  try {
    const response = await fetchProducts(undefined, 1);
    products = response.products || [];
  } catch (error) {
    console.error("Failed to fetch products for sitemap:", error);
  }

  const productsRoutes: routeType = products.map((product) => ({
    url: `/product/${product.slug}`,
    changeFrequency: "hourly",
    priority: 0.8,
  }));

  const allRoutes: routeType = [...staticRoutes, ...productsRoutes];

  return allRoutes.map((route) => ({
    url: `${BASE_URL}${route.url}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
