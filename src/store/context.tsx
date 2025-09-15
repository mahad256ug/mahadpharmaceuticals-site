"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { productType } from "@/lib/types";

interface StoreContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  productsCart: productType[];
  resetProductCart: () => void;
  addProductToCart: (arg0: productType) => void;
  removeProductFromCart: (arg0: productType) => void;
  deleteAlertState: {
    product?: productType;
    title: string;
    isVisible: boolean;
  };
  setDeleteAlertState: React.Dispatch<
    React.SetStateAction<{
      product?: productType;
      title: string;
      isVisible: boolean;
    }>
  >;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [productsCart, setProductsCart] = useState<productType[]>([]);
  const [deleteAlertState, setDeleteAlertState] = useState<{
    product?: productType;
    title: string;
    isVisible: boolean;
  }>({
    product: undefined,
    title: "",
    isVisible: false,
  });

  const checkAuth = async () => {
    console.log("authenicating");
    try {
      const res = await fetch("/api/check-auth", {
        method: "GET",
        credentials: "include", // important!
      });
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
    } catch (err) {
      console.log(err);
      setIsAuthenticated(false);
    }
  };

  function addProductToCart(data: productType) {
    setProductsCart((prevState) => {
      const newProductState = [...prevState, data];
      localStorage.setItem("cartProducts", JSON.stringify(newProductState));
      return newProductState;
    });
  }

  function removeProductFromCart(data: productType) {
    setProductsCart((prevState) => prevState.filter((p) => p.id !== data.id));
  }

  function resetProductCart() {
    setProductsCart([]);
  }

  useEffect(() => {
    checkAuth();

    const recentCartProducts = localStorage.getItem("cartProducts");
    if (recentCartProducts) {
      setProductsCart(JSON.parse(recentCartProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(productsCart));
  }, [productsCart]);

  const store: StoreContextType = {
    isAuthenticated,
    setIsAuthenticated,
    productsCart,
    addProductToCart,
    resetProductCart,
    removeProductFromCart,
    deleteAlertState,
    setDeleteAlertState,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export function useStoreContext(): StoreContextType {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreContext must be used within a StoreProvider");
  }
  return context;
}
