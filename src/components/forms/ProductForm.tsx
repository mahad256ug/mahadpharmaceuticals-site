"use client";

import React, { useState } from "react";
import { productType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { productSchema, ProductSchema } from "@/lib/schema";

// components
import MaxWidthWrapper from "../MaxWidthWrapper";

type Props = {
  initialProduct?: Partial<productType>;
  onSubmit?: (product: productType) => void;
};

export default function ProductForm({ initialProduct = {}, onSubmit }: Props) {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    initialProduct.thumbnail ?? null
  );
  const id = initialProduct.id ?? Date.now().toString();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: initialProduct.title ?? "",
      slug: initialProduct.slug ?? "",
      price: initialProduct.price ?? "",
      description: initialProduct.description ?? "",
      is_publish: initialProduct.is_publish ?? false,
      is_featured: initialProduct.is_featured ?? false,
      view_price: initialProduct.view_price ?? true,
      thumbnail: initialProduct.thumbnail ?? "",
    },
  });

  function generateSlug(value: string) {
    return (
      value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-") || Date.now().toString()
    );
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limit to 1000 KB (≈ 1 MB)
    const maxSize = 1000 * 1000;
    if (file.size > maxSize) {
      alert("File size must be less than 1000KB (1MB).");
      e.target.value = ""; // reset input
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

  const onSubmitForm: SubmitHandler<ProductSchema> = (data) => {
    const product: productType = {
      id,
      ...data,
    };
    console.log(product, "this is the product");
    if (onSubmit) onSubmit(product);
    else console.log("Submitted product:", product);
  };

  return (
    <MaxWidthWrapper>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="max-w-4xl mx-auto sm:p-10 space-y-6"
      >
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-800">
            Product details
          </h2>
          <span className="text-sm text-slate-500">Modern Tailwind form</span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Title</span>
              <input
                {...register("title")}
                onChange={(e) => {
                  const val = e.target.value;
                  setValue("title", val);
                  if (!watch("slug")) setValue("slug", generateSlug(val));
                }}
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
                <span className="text-sm font-medium text-slate-700">Slug</span>
                <input
                  {...register("slug")}
                  onChange={(e) =>
                    setValue("slug", generateSlug(e.target.value))
                  }
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
                    <p className="text-sm text-slate-500">No image selected</p>
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
                  Save product
                </button>

                <button
                  type="button"
                  onClick={() => {
                    reset();
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

        <footer className="text-xs text-slate-400 text-right">
          ID: {id ?? 0}
        </footer>
      </form>
    </MaxWidthWrapper>
  );
}
