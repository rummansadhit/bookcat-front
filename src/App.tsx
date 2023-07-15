import React, { useEffect } from 'react';
import logo from './logo.svg';

import Navbar from './components/Navbar';
import { RouterProvider } from 'react-router-dom';
import { listenToAuthChanges } from './Action/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { Toaster } from 'react-hot-toast';
import Router from './Routes/Router';
function App() {

  const dispatch = useDispatch<any>();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);


  return (
    <div>
              <RouterProvider router={Router}></RouterProvider>

              <Toaster></Toaster>
    </div>
  );
}

export default App;
