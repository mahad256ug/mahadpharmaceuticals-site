// app/products/[slug]/page.tsx
export const dynamic = "force-dynamic"; // must be at top

import ProductDetailWrapper from "@/components/ProductDetail";
import { Metadata } from "next";

// fetch product server-side
async function getProduct(slug: string) {
  const res = await fetch(`http://127.0.0.1:3000/api/products/${slug}/`, {
    cache: "force-cache", // ✅ caches response on the server
    next: {
      revalidate: 180, // optional: 6 hours in seconds
    },
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data;
}

// dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const productInfo = await getProduct(slug);

  const product = productInfo.product;
  if (productInfo.success) {
    return {
      title: `${product.title} | Maha Pharmaceuticals`,
      description:
        product.description?.slice(0, 160) ?? "View product details.",
    };
  }

  return {
    title: "Product Not Found | Maha Pharmaceuticals",
    description: "This product does not exist or is unavailable.",
  };
}

// actual page
export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  return <ProductDetailWrapper slug={slug} />;
}
