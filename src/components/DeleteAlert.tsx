"use client";

import React from "react";
import { useStoreContext } from "@/store/context";
import { toast } from "react-toastify";

const DeleteAlert = () => {
  const { deleteAlertState, setDeleteAlertState } = useStoreContext();

  async function handleDeleteProduct(productId: string) {
    if (!productId) {
      toast.error("Please use a valid product ID.");
      return;
    }

    try {
      const res = await fetch("/api/products/remove", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: productId }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Product was deleted successfully.");
        setDeleteAlertState((prev) => ({ ...prev, isVisible: false }));
        window.location.reload();
      } else {
        toast.error("Failed to delete product.");
      }
    } catch (err) {
      toast.error("Failed to delete product.");
      console.error("Error deleting product:", err);
    }
  }

  if (!deleteAlertState.isVisible) return null;

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center z-50">
      <div
        className="fixed top-0 left-0 h-screen w-screen bg-black/50 backdrop-blur-sm cursor-pointer"
        onClick={() =>
          setDeleteAlertState((prev) => ({ ...prev, isVisible: false }))
        }
      />

      <div className="bg-white py-10 relative max-w-lg w-full">
        <div className="p-6 pt-0 text-center">
          <svg
            className="w-20 h-20 text-red-600 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <h3 className="font-normal uppercase mt-5 mb-2">
            {deleteAlertState.product?.title}
          </h3>

          <p className="mb-8">
            You are about to delete{" "}
            <span className="text-green-500">
              {deleteAlertState.product?.title}
            </span>
            . If yes, confirm; else cancel.
          </p>

          <div className="flex items-center gap-4 justify-center">
            <button
              type="button"
              onClick={() =>
                handleDeleteProduct(deleteAlertState.product?.id ?? "")
              }
              className="text-red-500 focus:ring-4 focus:ring-red-300 font-medium text-base inline-flex items-center px-4 py-2.5 text-center border border-red-500"
            >
              Yes, I&apos;m sure
            </button>

            <button
              type="button"
              onClick={() =>
                setDeleteAlertState((prev) => ({ ...prev, isVisible: false }))
              }
              className="text-green-500 bg-white hover:bg-green-100 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center text-base px-4 py-2.5 text-center border border-green-500"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlert;
