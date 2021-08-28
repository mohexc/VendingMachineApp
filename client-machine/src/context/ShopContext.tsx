import React, { FC, useContext, useEffect, useState } from "react";
import { Inventory, Shop } from "../types";
import { useAuthContext } from "./AuthContext";

interface ContextInterface {
  shop: Shop | undefined;
  inventories: Inventory[] | undefined;
  getShop(id: string): void;
  getInvetories(id: string): void;
}

const Context = React.createContext<ContextInterface | null>(null);

const ShopContext: FC = ({ children }) => {
  const [shop, setShop] = useState<Shop | undefined>();
  const [inventories, setInventories] = useState<Inventory[] | undefined>();
  const { httpRequests } = useAuthContext();

  useEffect(() => {}, []);

  const getShop = async (id: string) => {
    const { data } = await httpRequests.get(`shops/${id}/inventories`);
    setShop(data);
  };
  const getInvetories = async (id: string) => {
    const { data } = await httpRequests.get(`inventories/shop/${id}`);
    setInventories(data);
  };
  return (
    <Context.Provider
      value={{
        shop,
        inventories,
        getShop,
        getInvetories,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useShopContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Cannot use useShopContext outside Shop Context");
  }

  return context;
};

export default ShopContext;
