import React, { FC, useContext, useEffect, useState } from "react";
import { AlertInterface } from "../types";
import { useAuthContext } from "./AuthContext";

interface ContextInterface {
  alertNotread: AlertInterface[] | undefined;
  getAlertNotRead(): void;
  updatedRead(ids): void;
}

const Context = React.createContext<ContextInterface | null>(null);

const AlertContext: FC = ({ children }) => {
  const { httpRequests } = useAuthContext();
  const [alertNotread, setAlertNotread] = useState<AlertInterface[] | undefined>();
  useEffect(() => {
    getAlertNotRead();
    // eslint-disable-next-line
  }, []);

  const getAlertNotRead = async () => {
    const { data } = await httpRequests.get("alert/noread");
    setAlertNotread(data);
  };

  const updatedRead = async (ids) => {
    await httpRequests.post("alert/update-isread", { ids });
  };

  return (
    <Context.Provider
      value={{
        alertNotread,
        updatedRead,
        getAlertNotRead,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAlertContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Cannot use useAlertContext outside User Context");
  }

  return context;
};

export default AlertContext;
