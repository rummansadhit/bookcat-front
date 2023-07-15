import { configureStore,combineReducers, Action, CombinedState, AnyAction} from '@reduxjs/toolkit';
import thunk, { ThunkDispatch, ThunkMiddleware } from 'redux-thunk';
import 'firebase/compat/auth'

import {firebaseConfig} from './firebase/firebase.config';
import firebase from 'firebase/compat/app';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
  getFirebase
} from 'react-redux-firebase'
import userReducer from './Reducers/userReducer';

import { api } from './Slice/bookApi';
import bookReducer from './Slice/bookSlice';


firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
const rootReducer = combineReducers({
  
  firebase: firebaseReducer,
  user: userReducer,

  [api.reducerPath]: api.reducer,
  books: bookReducer,



});

const initialState = {}

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({reducer: rootReducer, middleware: [thunk.withExtraArgument({getFirebase}), api.middleware]});

export type AppDispatch = ThunkDispatch<CombinedState<RootState>, any, AnyAction>;

export const rrfProps = {
  firebase,
  config: {},
  dispatch: store.dispatch as ThunkDispatch<RootState, any, AnyAction>,
  
};


export default store;