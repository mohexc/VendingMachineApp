import axios, { AxiosInstance } from "axios";
import React, { FC, useContext, useEffect, useState } from "react";

interface CurrentUser {
  id: number;
  username: string;
}

interface ContextInterface {
  currentUser: CurrentUser | undefined;
  httpRequests: AxiosInstance;
  signin(): void;
  signup(): void;
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

  const signin = async () => {
    console.log("signin");
  };
  const signup = async () => {
    console.log("signup");
  };

  return (
    <Context.Provider
      value={{
        currentUser,
        httpRequests,
        signin,
        signup,
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
