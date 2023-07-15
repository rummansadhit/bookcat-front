import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useAddBookMutation } from './bookApi';





export interface IBook {
    title: string;
    author: string;
    genre: string;
    publicationDate: string;
  }




// Create the book slice
const bookSlice = createSlice({
    name: 'books',
    initialState: [] as IBook[],
    reducers: {
      bookAdded: (state, action: PayloadAction<IBook>) => {
        state.push(action.payload);
      },
    },
  });
  
  export const { bookAdded } = bookSlice.actions;
  export default bookSlice.reducer;

