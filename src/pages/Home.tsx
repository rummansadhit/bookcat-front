import React, { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../store';
import { ThunkDispatch } from 'redux-thunk';
import { User } from '@firebase/auth-types';
import Navbar from '../components/Navbar';
const Home = () => {
    
    const user = useSelector((state: RootState) => state.user.user);
  
  
    // Render component based on user state
  
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  };

export default Home;