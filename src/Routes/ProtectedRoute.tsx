import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ColorRing } from 'react-loader-spinner';
import { useDisclosure } from '@chakra-ui/react';
import LoginForm from '../components/Register';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const auth = useSelector((state: RootState) => state.firebase.auth);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  useEffect(() => {
    if (isLoaded(auth) && isEmpty(auth)) {
      // If auth is loaded and user is not authenticated,
      // set the flag to show the register modal
      setShowRegisterModal(true);
    } else {
      // Otherwise, set the flag to false
      setShowRegisterModal(false);
    }
  }, [auth]);

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

  if (showRegisterModal) {
    // Render the register modal
    return <LoginForm onClose={onClose} title="Login" isOpen={true} />;
  }

  const user = isLoaded(auth) && !isEmpty(auth);
  console.log(user);

  return <>{children}</>;
};

export default ProtectedRoute;