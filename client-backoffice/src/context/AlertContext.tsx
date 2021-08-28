import React, { FC, useContext, useEffect } from "react";

interface ContextInterface {}

const Context = React.createContext<ContextInterface | null>(null);

const AlertContext: FC = ({ children }) => {
  useEffect(() => {}, []);

  return <Context.Provider value={{}}>{children}</Context.Provider>;
};

export const useAlertContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Cannot use useAlertContext outside User Context");
  }

  return context;
};

export default AlertContext;
