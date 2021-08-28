import axios, { AxiosInstance } from "axios";
import React, { FC, useContext, useEffect, useState } from "react";
import { CurrentUser } from "../types";

interface ContextInterface {
  currentUser: CurrentUser | undefined;
  httpRequests: AxiosInstance;
}

const Context = React.createContext<ContextInterface | null>(null);

const AuthContext: FC = ({ children }) => {
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>();
  // eslint-disable-next-line
  const [tokenKey, setTokenKey] = useState<string | undefined>();

  useEffect(() => {}, []);

  const httpRequests = axios.create({
    baseURL: "http://localhost:3001/",
    headers: { Authorization: `Bearer ${tokenKey}` },
  });
  // eslint-disable-next-line
  const signin = async () => {
    console.log("signin");
  };
  // eslint-disable-next-line
  const signup = async () => {
    console.log("signup");
  };

  return (
    <Context.Provider
      value={{
        currentUser,
        httpRequests,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Cannot use useAuthContext outside Auth Context");
  }

  return context;
};

export default AuthContext;
