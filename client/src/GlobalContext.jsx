import React, { createContext, useEffect, useState } from "react";
import useAuth from "./API/AuthApi";

export const GlobalContext = createContext();

const DataProvider = (props) => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("loginToken")) {
      const getToken = (async) => {
        const mytoken = localStorage.getItem("loginToken");
        setToken(mytoken);
      };
      getToken();
    }
  }, [token]);
  const data = {
    authApi: useAuth(token),
  };
  return (
    <GlobalContext.Provider value={props}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default DataProvider;
