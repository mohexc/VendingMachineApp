import React, { FC, useContext, useEffect, useState } from "react";
import { Machine } from "../types";
import { useAuthContext } from "./AuthContext";
interface ContextInterface {
  machines: Machine[] | undefined;
  getMachinesAll: () => Promise<any>;
  getMachineByIdAndInventory(id): any;
}

const Context = React.createContext<ContextInterface | null>(null);

const MachineContext: FC = ({ children }) => {
  const { httpRequests } = useAuthContext();
  const [machines, setMachines] = useState<Machine[] | undefined>();

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  const getMachinesAll = async () => {
    const { data } = await httpRequests.get("shops");
    setMachines(data);
  };

  const getMachineByIdAndInventory = async (id) => {
    const { data } = await httpRequests.get(`shops/${id}/inventories`);
    return data;
  };

  return (
    <Context.Provider
      value={{
        machines,
        getMachinesAll,
        getMachineByIdAndInventory,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useMachineContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Cannot use useMachineContext outside Machine Context");
  }

  return context;
};

export default MachineContext;
