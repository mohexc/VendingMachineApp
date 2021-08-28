import React, { FC, useContext, useState } from "react";
import { CartItem, Inventory } from "../types";
import { useAuthContext } from "./AuthContext";
import { useShopContext } from "./ShopContext";

interface ContextInterface {
  cart: CartItem[] | undefined;
  addCartItem(inventory: any): void;
  removeCartItem(inventory: any): void;
  checkOut(shopId: string): void;
  clearCart(): void;
}

const Context = React.createContext<ContextInterface | null>(null);

const CartContext: FC = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { shop, getInvetories } = useShopContext();
  const { httpRequests } = useAuthContext();
  const addCartItem = (inventory: Inventory) => {
    const _cart = [...cart];
    const findeCartItem = _cart.find((cartItem) => inventory.id === cartItem.inventory.id);
    const findeCartItemIndex = _cart.findIndex((cartItem) => inventory.id === cartItem.inventory.id);
    if (findeCartItem?.qyt === inventory.qyt) {
      return;
    }
    if (findeCartItem) {
      findeCartItem.qyt = findeCartItem.qyt + 1;
      _cart[findeCartItemIndex] = findeCartItem;
      return setCart(_cart);
    } else {
      const cartItem = {
        inventory,
        qyt: 1,
      };
      _cart.push(cartItem);
      return setCart(_cart);
    }
  };

  const removeCartItem = (inventory: Inventory) => {
    const _cart = [...cart];
    const findeCartItem = _cart.find((cartItem) => inventory.id === cartItem.inventory.id);
    const findeCartItemIndex = _cart.findIndex((cartItem) => inventory.id === cartItem.inventory.id);

    if (findeCartItem) {
      findeCartItem.qyt = findeCartItem.qyt - 1;
      if (findeCartItem.qyt === 0) {
        const filted = _cart.filter((cartItem) => cartItem.inventory.id !== findeCartItem.inventory.id);
        return setCart(filted);
      } else {
        _cart[findeCartItemIndex] = findeCartItem;
        return setCart(_cart);
      }
    }
  };

  const checkOut = async (shopId: string) => {
    const order = {
      shopId: shop?.id,
      orderItems: cart.map((cartItem) => ({
        inventoryId: cartItem.inventory.id,
        qyt: cartItem.qyt,
      })),
    };
    await httpRequests.post("orders", order);
    setCart([]);
    getInvetories(shopId);
  };
  const clearCart = () => setCart([]);
  return (
    <Context.Provider
      value={{
        cart,
        addCartItem,
        removeCartItem,
        checkOut,
        clearCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Cannot use useCartContext outside Auth Context");
  }

  return context;
};

export default CartContext;
