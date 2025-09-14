"use client";

import { productType } from "@/lib/types";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface StoreContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  productsCart: productType[];
  addProductToCart: (arg0: productType) => void;
  removeProductFromCart: (arg0: productType) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [productsCart, setProductsCart] = useState<productType[]>(() => {
    const recentCartProducts = localStorage.getItem("cartProducts");

    if (recentCartProducts) {
      return JSON.parse(recentCartProducts);
    } else {
      return [];
    }
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

  useEffect(() => {
    checkAuth();
  }, []);

  const store: StoreContextType = {
    isAuthenticated,
    setIsAuthenticated,
    productsCart,
    addProductToCart,
    removeProductFromCart,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

// 4. Custom hook
export function useStoreContext(): StoreContextType {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreContext must be used within a StoreProvider");
  }
  return context;
}
