import * as React from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";

import List from "../Components/List/List";
import ProtectedRoute from "./ProtectedRoute";


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
        path: "/Login",
        element: <Login />,
        
      },
      {
        path: "/Register",
        element: <Register />,
        
      },

      {
        path: "/List",
        element: <ProtectedRoute>  <List /></ProtectedRoute> ,
        
      }



    ],
  },
]);

export default router;