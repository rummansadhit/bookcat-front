import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ColorRing } from 'react-loader-spinner';

interface ProtectedRouteProps {
    children: React.ReactNode;
  }


  export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children}) => {

    const auth = useSelector((state: RootState) => state.firebase.auth);

    if (!isLoaded(auth)) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <span>
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          </span>
        </div>
      );
    }


    const user = isLoaded(auth) && !isEmpty(auth)

    if (!user) {
      // user is not authenticated
      return <Navigate to="/Login" />;
    }
    return <>{children}</>;
  };

export default ProtectedRoute;