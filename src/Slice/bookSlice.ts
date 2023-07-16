

import { AnyAction, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api, useAddBookMutation, useGetBooksQuery } from './bookApi';
import { RootState } from '../store';





export interface IBook {
    guid: string;
    title: string;
    author: string;
    genre: string;
    publicationDate: string;
  }


  interface IBookState {
    books: IBook[];
    genreFilter: string;
    publicationYearFilter: string;
  }
  
  const initialState: IBookState = {
    books: [],
    genreFilter: '',
    publicationYearFilter: '',
  };

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
      bookAdded: (state, action: PayloadAction<IBook>) => {
        state.books = [...state.books, action.payload];
      },

      setGenreFilter: (state, action: PayloadAction<string>) => {
        state.genreFilter = action.payload;
      },
      setPublicationYearFilter: (state, action: PayloadAction<string>) => {
        state.publicationYearFilter = action.payload;
      },


    },
   extraReducers: (builder) => {
        builder.addMatcher(api.endpoints.getBooks.matchFulfilled, (state, action) => {
            state.books = action.payload;
          
        });
      }, 




  });
  export const selectFilteredBooks = (state: RootState) => {
    const { books, genreFilter, publicationYearFilter } = state.books;
    
    console.log(books);


    return books.filter((book) => {

        if (!genreFilter && !publicationYearFilter) {
            // If no filters are selected, return true for all books
            return true;
          }


      if (genreFilter && book.genre.toLowerCase().includes(genreFilter.toLowerCase())) {
        return true;
      }
      if (publicationYearFilter && book.publicationDate.includes(publicationYearFilter)) {
        return true;
      }
      return false;
    });
  };
  export const { bookAdded, setGenreFilter, setPublicationYearFilter  } = bookSlice.actions;
  export default bookSlice.reducer;

