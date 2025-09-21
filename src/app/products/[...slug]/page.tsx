// app/products/[slug]/page.tsx
export const dynamic = "force-dynamic"; // must be at top

import { Metadata } from "next";
import ProductDetailWrapper from "@/components/ProductDetail";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:3000"
    : "https://maha-pharmacueticals.vercel.app";

// fetch product server-side
async function getProduct(slug: string) {
  const res = await fetch(`${BASE_URL}/api/products/${slug}/`);

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
      metadataBase: new URL(BASE_URL),
      title: `${product.title} | Maha Pharmaceuticals`,
      description:
        product.description?.slice(0, 160) ?? "View product details.",
      openGraph: {
        title: product.title,
        description: product.description,
        images: [
          {
            url: product.thumbnail ?? "/courrpt-image.jpg",
            width: 800,
            height: 600,
            alt: product.title,
          },
        ],
        locale: "en_US",
        type: "website",
      },
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
