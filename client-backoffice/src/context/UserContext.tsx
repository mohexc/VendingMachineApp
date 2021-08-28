import React, { FC, useContext, useState } from "react";
import { useAuthContext } from "./AuthContext";

export interface User {
  id: number;
  username: string;
}
interface ContextInterface {
  users: User[] | undefined;
  getUsersAll: () => Promise<any>;
}

const Context = React.createContext<ContextInterface | null>(null);

const UserContext: FC = ({ children }) => {
  const [users, setUsers] = useState<User[] | undefined>();
  const { httpRequests } = useAuthContext();

  const getUsersAll = async () => {
    const { data } = await httpRequests.get("users");
    setUsers(data);
  };

  return (
    <Context.Provider
      value={{
        users,
        getUsersAll,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Cannot use useUserContext outside UserContext");
  }

  return context;
};

export default UserContext;
