"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";

interface StoreContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const store: StoreContextType = {
    isAuthenticated,
    setIsAuthenticated,
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
