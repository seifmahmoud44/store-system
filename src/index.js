import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./pages/Signin";
import Storage from "./pages/Storage";

import Home from "./pages/Home";

import Root from "./routes/Root";
import Settings from "./pages/Settings";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./store/store";
import Actions from "./pages/Actions";

const router = createBrowserRouter([
  {
    path: `/`,
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "storage",
        element: <Storage />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "actions",
        element: <Actions />,
      },
    ],
  },
  {
    path: "/signin",
    element: <Signin />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </Provider>
);
