import * as React from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";

import ProtectedRoute from "./ProtectedRoute";
import AddBook from "../pages/AddBook";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        
      },
      {
        path: "/add",
        element: <AddBook />,
        
      }



    ],
  },
]);

export default router;