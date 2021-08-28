import React, { FC, useContext, useState } from "react";
import { Product } from "../types";
import { useAuthContext } from "./AuthContext";

interface ContextInterface {
  products: Product[] | undefined;
  getProductsAll: () => Promise<any>;
}

const Context = React.createContext<ContextInterface | null>(null);

const ProductContext: FC = ({ children }) => {
  const [products, setProducts] = useState<Product[] | undefined>();
  const { httpRequests } = useAuthContext();

  const getProductsAll = async () => {
    const { data } = await httpRequests.get("products");
    setProducts(data);
  };
  return (
    <Context.Provider
      value={{
        products,
        getProductsAll,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Cannot use useProductContext outside  ProductContext");
  }

  return context;
};

export default ProductContext;
