import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ThemeContextProvider from "../Context/useContext";
import { routes } from "./routes";

function AppRouter() {
  const showContentMenus = () => {
    const result = routes?.map((route, index) => {
      return <Route key={index} path={route?.path} element={route.main} />;
    });
    return <>{result}</>;
  };
  return (
    <ThemeContextProvider>
      <Router>
        <Routes>{showContentMenus()}</Routes>
      </Router>
    </ThemeContextProvider>
  );
}

export default AppRouter;
