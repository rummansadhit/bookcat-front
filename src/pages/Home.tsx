import React, { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { listenToAuthChanges } from '../../Actions/userAction';
import { AppDispatch, RootState } from '../store';
import { ThunkDispatch } from 'redux-thunk';
import { User } from '@firebase/auth-types';
const Home = () => {
    
    const user = useSelector((state: RootState) => state.user.user);
  
  
    // Render component based on user state
  
    return (
      <div>
        {user ? <p>Welcome, {user.email}</p> : <p>Please log in.</p>}
      </div>
    );
  };

export default Home;