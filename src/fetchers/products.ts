"use server";

import { productType } from "@/lib/types";
import { BASE_URL } from "@/lib/constants";

type fetchProductsTy = {
  products: productType[];
  paginator: {
    page: number;
    totalPages: number;
    loading: boolean;
  };
};

export async function fetchHomeFeaturedProducts(): Promise<productType[]> {
  const endPoint = `${BASE_URL}/api/products/featured/`;

  const res = await fetch(`${endPoint}`, {
    method: "GET",
    next: { revalidate: 3600 },
  });

  if (res.ok) {
    const { products } = await res.json();
    return products;
  }

  return [];
}

export async function fetchHomeProducts(): Promise<productType[]> {
  const endPoint = `${BASE_URL}/api/products/home/`;

  const res = await fetch(endPoint, {
    method: "GET",
    next: { revalidate: 3600 },
  });

  if (res.ok) {
    const { products } = await res.json();
    return products;
  }

  return [];
}

export async function fetchProducts(
  searchQ: string | undefined,
  pgNum: number
): Promise<fetchProductsTy> {
  let endPoint: string;

  if (searchQ) {
    endPoint = `${BASE_URL}/api/products/search/?search_query=${searchQ}&page=${1}`;
  } else {
    endPoint = `${BASE_URL}/api/products/?page=${pgNum}`;
  }

  const res = await fetch(endPoint, {
    method: "GET",
    next: { revalidate: 3600 },
  });

  if (res.ok) {
    const resData = await res.json();

    return {
      products: resData.products,
      paginator: {
        page: resData.pageNum,
        totalPages: resData.totalPages,
        loading: false,
      },
    };
  }

  return {
    products: [],
    paginator: {
      page: 1,
      totalPages: 1,
      loading: false,
    },
  };
}

export async function fetchProduct(slug: string): Promise<productType | null> {
  const res = await fetch(`${BASE_URL}/api/products/details/${slug}/`, {
    method: "GET",
    next: { revalidate: 3600 },
  });
  if (res.ok) {
    const data = await res.json();
    return data.product;
  }

  return null;
}

export async function fetchUnpublishedProducts(): Promise<productType[]> {
  const endPoint = `${BASE_URL}/api/products/un-published/`;

  const res = await fetch(`${endPoint}`, {
    method: "GET",
    next: { revalidate: 3600 },
  });

  if (res.ok) {
    const data = await res.json();
    return data.products;
  } else {
    return [];
  }
}
