import * as React from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";

import ProtectedRoute from "./ProtectedRoute";
import AddBook from "../pages/AddBook";
import Detailed from "../pages/Detailed";
import EditBookPage from "../pages/EditBook";


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
        element: <ProtectedRoute> <AddBook />  </ProtectedRoute>
        
      },
      {
        path: "/books/:bookId",
        element: <Detailed />,
      },
      {
        path: "/books/edit/:bookId",
        element: <EditBookPage />,
      }


    ],
  },
]);

export default router;