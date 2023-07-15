import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { auth } from '../store';


import { User } from '@firebase/auth-types';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export interface LoginSuccessAction extends Action<typeof LOGIN_SUCCESS> {
  payload: User;
}

export interface LogoutSuccessAction extends Action<typeof LOGOUT_SUCCESS> {}

export const loginSuccess = (user: User): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const logoutSuccess = (): LogoutSuccessAction => ({
  type: LOGOUT_SUCCESS,
});
