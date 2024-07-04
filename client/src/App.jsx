import "./App.css";
import React, { useContext, useEffect } from "react";
import Page from "./components/Page";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import FirstPage from "./components/mainPage/firstPage/FirstPage";
import { routesList } from "./router";
import { ToastContainer } from "react-toastify";
import { ChakraProvider } from '@chakra-ui/react'
import { Context } from ".";
import { observer } from "mobx-react-lite";


function App() {
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);
  if (store.isLoading) {
    return <div>Загрузка....</div>
  }
  return (
    <>
      <ChakraProvider resetCSS={false}>
        <Routes>
          <Route path="/" element={<Page />}>
            <Route index element={<FirstPage />} />
            {routesList.map((route =>
              <Route
                path={route.path}
                element={route.element}
                exact={route.exact}
                key={route.path}
              />
            ))}
            <Route path="*" element={"Loading"} />
          </Route>
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </ChakraProvider>
    </>
  );
}

export default observer(App);
