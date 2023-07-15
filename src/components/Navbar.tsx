
import React from 'react';
import LoginForm from './Register';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useFirebase } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';

const Navbar = () => {

    const user = useSelector((state: RootState) => state.user.user);


    const firebase = useFirebase();
    const handleLogout = () => {
   
      firebase.logout()
      .then(() => {
        // Logout successful, perform any necessary actions
      })
      .catch((error:any) => {
        // Handle any errors that occur during logout
        console.error('Logout error:', error);
      });
  
    }




    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <div>
            
          
<div className="navbar bg-base-100">
<div className="navbar-start">
  <div className="dropdown">
    <label tabIndex={0} className="btn btn-ghost lg:hidden">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
    </label>
    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      <li><Link to='/add'>Add a book</Link></li>
      <li><Link to='/'>Home</Link></li>
    </ul>
  </div>
  <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
</div>
<div className="navbar-center hidden lg:flex">
  <ul className="menu menu-horizontal px-1">
    <li><Link to='/add'>Add a book</Link></li>
    <li><Link to='/'>Home</Link></li>
  </ul>
</div>

{

user?
<div className="navbar-end">
  <a className="btn" onClick={handleLogout}>Logout</a>
</div>

:
<div className="navbar-end">
  <a className="btn" onClick={onOpen}>Login</a>
</div>

}

</div>


<LoginForm isOpen={isOpen} onClose={onClose} title="Login" />
        </div>
    );
};

export default Navbar;