import React, { FC } from "react";
import AuthContext from "./AuthContext";
import CartContext from "./CartContext";
import ShopContext from "./ShopContext";

const ContextStore: FC = ({ children }) => {
  return (
    <AuthContext>
      <ShopContext>
        <CartContext>{children}</CartContext>
      </ShopContext>
    </AuthContext>
  );
};

export default ContextStore;
