import React, { FC } from "react";
import AlertContext from "./AlertContext";
import AuthContext from "./AuthContext";
import MachineContext from "./MachineContext";
import ProductContext from "./ProductContext";
import UserContext from "./UserContext";

const ContextStore: FC = ({ children }) => {
  return (
    <AuthContext>
      <AlertContext>
        <UserContext>
          <MachineContext>
            <ProductContext>{children}</ProductContext>
          </MachineContext>
        </UserContext>
      </AlertContext>
    </AuthContext>
  );
};

export default ContextStore;
