"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useEffect, useState } from "react";

import Spinner from "../Spinner";
import { slugify } from "@/lib/utils";
import { toast } from "react-toastify";
import { productType } from "@/lib/types";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { productSchema, ProductSchema } from "@/lib/schema";
import { useStoreContext } from "@/store/context";

type Props = {
  slug?: string;
};

export default function ProductForm({ slug }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const addProductParam = searchParams.get("add_product");

  const { isAuthenticated, authLoading } = useStoreContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [initialProduct, setInitialProduct] = useState<Partial<productType>>();
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      slug: "",
      price: "",
      description: "",
      is_publish: false,
      is_featured: false,
      view_price: true,
      thumbnail: "",
    },
  });

  // auto-generate slug
  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      toast.error("Please login to add or manage products");
      router.push("/?login=true");
    }

    if (watch("title")) {
      setValue("slug", slugify(getValues("title")));
    }
  }, [watch("title"), getValues, setValue, isAuthenticated, authLoading]);

  // fetch product if editing
  useEffect(() => {
    async function fetchProduct() {
      if (!slug) return;

      try {
        setLoading(true);
        setNotFound(false);

        const res = await fetch(`/api/products/${slug}/`);
        if (res.ok) {
          const data = await res.json();
          if (data?.product) {
            setInitialProduct(data.product);
            reset(data.product);
            setThumbnailPreview(data.product.thumbnail ?? null);
          } else {
            setNotFound(true);
          }
        } else if (res.status === 404) {
          setNotFound(true);
        }
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug, reset]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 1000 * 1000; // 1MB
    if (file.size > maxSize) {
      alert("File size must be less than 1000KB (1MB).");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setThumbnailPreview(result);
      setValue("thumbnail", result);
    };
    reader.readAsDataURL(file);
  }

  function handleRemoveImage() {
    setThumbnailPreview(null);
    setValue("thumbnail", "");
  }

  const onSubmitForm: SubmitHandler<ProductSchema> = async (data) => {
    const apiUrl = slug ? "/api/products/update" : "/api/products/add";
    const postData = slug ? { ...data, id: initialProduct?.id } : data;
    setSubmitting(true);
    try {
      const res = await fetch(apiUrl, {
        method: slug ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const resData = await res.json();

      if (res.ok) {
        reset({});
        toast.success(resData.message || "Product saved successfully!");
        router.push(`/products/${resData.product.slug}`);
      } else {
        toast.error(
          resData.message ||
            "Failed to update. Incorrect data or internal error."
        );
      }
    } catch (err) {
      toast.error(`Something went wrong. ${String(err)}`);
    } finally {
      setSubmitting(false);
    }
  };

  // --- UI render conditions ---
  if (loading) {
    return (
      <MaxWidthWrapper>
        <div className="w-full h-[65vh] flex items-center justify-center">
          <div className="h-10 w-10">
            <Spinner className="fill-green-500 text-green-50" />
          </div>
        </div>
      </MaxWidthWrapper>
    );
  }

  if (notFound) {
    return (
      <MaxWidthWrapper>
        <div className="flex items-center h-[65vh] py-8 justify-center">
          <div className="text-center flex flex-col gap-2">
            <h3 className="text-4xl mb-6">404</h3>
            <div className="max-w-md sm:max-w-xs mx-auto p-10">
              <h5 className="text-xl mb-6 uppercase">Product Not Found</h5>
              <p>
                The product with slug <strong>{slug}</strong> was not found, or
                you have an invalid URL.
              </p>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    );
  }

  // only show form if adding OR product loaded
  if (addProductParam || slug || initialProduct) {
    return (
      <MaxWidthWrapper className="relative">
        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="max-w-4xl mx-auto sm:p-10 space-y-6"
        >
          <header className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-800">
              {slug
                ? `Update ${initialProduct?.title ?? slug}`
                : "Add a New Product"}
            </h2>
            <span className="text-sm text-slate-500">Modern Tailwind form</span>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Title
                </span>
                <input
                  {...register("title")}
                  placeholder="E.g. Organic Banana (1kg)"
                  className="form-input"
                  required
                />
                {errors.title && (
                  <span className="text-xs text-red-500">
                    {errors.title.message}
                  </span>
                )}
              </label>

              <div className="flex gap-4">
                <label className="flex-1 block">
                  <span className="text-sm font-medium text-slate-700">
                    Slug
                  </span>
                  <input
                    {...register("slug")}
                    readOnly={true}
                    placeholder="auto-generated-slug"
                    className="form-input"
                  />
                  {errors.slug && (
                    <span className="text-xs text-red-500">
                      {errors.slug.message}
                    </span>
                  )}
                </label>

                <label className="w-40 block">
                  <span className="text-sm font-medium text-slate-700">
                    Price
                  </span>
                  <input
                    {...register("price")}
                    placeholder="0.00"
                    inputMode="decimal"
                    className="mt-1 form-input"
                  />
                  {errors.price && (
                    <span className="text-xs text-red-500">
                      {errors.price.message}
                    </span>
                  )}
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Description
                </span>
                <textarea
                  {...register("description")}
                  rows={5}
                  placeholder="Short product description..."
                  className="mt-1 block w-full from-input px-4 py-3 focus:outline-none focus:ring-1 focus:ring-green-500 bg-neutral-100"
                />
                {errors.description && (
                  <span className="text-xs text-red-500">
                    {errors.description.message}
                  </span>
                )}
              </label>
            </div>

            <aside className="space-y-4">
              <div className="border border-slate-200 p-4 h-full flex flex-col">
                <div className="relative w-full h-48 overflow-hidden bg-slate-50 flex items-center justify-center">
                  {thumbnailPreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumbnailPreview}
                      alt="thumbnail preview"
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <div className="text-center px-4">
                      <p className="text-sm text-slate-500">
                        No image selected
                      </p>
                      <p className="mt-2 text-xs text-slate-400">
                        PNG, JPG or WEBP — up to 5MB
                      </p>
                    </div>
                  )}

                  <div className="absolute top-3 right-3 flex gap-2">
                    <label className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-3 py-1 text-xs border border-slate-100 shadow cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <span className="text-green-600 text-sm">Change</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-3 py-1 text-xs border border-slate-100 shadow"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="mt-4 space-y-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        Visibility
                      </p>
                      <p className="text-xs text-slate-400">
                        Control whether the product is published
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      {...register("is_publish")}
                      className="w-5 h-5 text-green-500 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        Featured
                      </p>
                      <p className="text-xs text-slate-400">
                        Highlight this product on listings
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      {...register("is_featured")}
                      className="w-5 h-5 text-green-500 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        Show price
                      </p>
                      <p className="text-xs text-slate-400">
                        Toggle price visibility to customers
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      {...register("view_price")}
                      className="w-5 h-5 text-green-500 rounded"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold shadow-md bg-green-500 hover:bg-green-600 text-white transition"
                  >
                    <p className="text-current">
                      {slug ? "Update" : "Save product"}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      reset({});
                      setThumbnailPreview(null);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium border border-slate-200 bg-white text-slate-700 shadow-sm"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </aside>
          </div>

          {initialProduct?.id && (
            <footer className="text-xs text-slate-400 text-right">
              ID: {initialProduct?.id}
            </footer>
          )}
        </form>

        {submitting && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 backdrop-blur-xs flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-2">
              <div className="h-10 w-10">
                <Spinner className="fill-green-500 text-green-50" />
              </div>

              <p className="text-black">Submitting</p>
            </div>
          </div>
        )}
      </MaxWidthWrapper>
    );
  }

  return null;
}
