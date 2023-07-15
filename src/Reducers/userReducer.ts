import { AnyAction } from "redux";
import { User } from '@firebase/auth-types';
interface UserState {
    user: User | null; // Replace 'User' with your actual user type
    // other user-related properties
  }
  
  const initialState: UserState = {
    user: null,
    // other initial state properties
  };
  
  const userReducer = (state = initialState, action: AnyAction): UserState => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          user: action.payload,
        };
      case 'LOGOUT_SUCCESS':
        return {
          ...state,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;