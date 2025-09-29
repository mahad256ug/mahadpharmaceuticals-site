import { Suspense } from "react";
import { Metadata } from "next";

// components
import { BASE_URL } from "@/lib/constants";
import { fetchProduct } from "@/fetchers/products";
import ProductDetailWrapper from "@/components/ProductDetail";

// dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params; // <-- NO await
  const product = await fetchProduct(slug);

  if (product) {
    return {
      metadataBase: new URL(BASE_URL ?? ""),
      title: `${product.title} | Maha Pharmaceuticals`,
      description:
        product.description?.slice(0, 160) ?? "View product details.",
      openGraph: {
        title: product.title,
        description: product.description,
        images: [
          {
            url: "/courrpt-image.jpg",
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // <-- NO awavit
  return (
    <Suspense fallback={<div></div>}>
      <ProductDetailWrapper slug={slug} />
    </Suspense>
  );
}
