

import { AnyAction, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api, useAddBookMutation, useGetBooksQuery } from './bookApi';
import { RootState } from '../store';




export interface IReview {
    userName: string;
    comment: string;
  }

  export interface IBook {
    guid: string;
    title: string;
    author: string;
    genre: string;
    publicationDate: string;
    reviews: IReview[];
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


      updateBook: (state, action: PayloadAction<IBook>) => {
        const { guid } = action.payload;
        const index = state.books.findIndex((book) => book.guid === guid);
        if (index !== -1) {
          state.books[index] = action.payload;
        }},

        bookDeleted: (state, action: PayloadAction<IBook>) => {
            
            const {guid} = action.payload
            state.books=state.books.filter((book) => book.guid !== guid);
          },
      



      addReview: (state, action: PayloadAction<{ bookId: string; review: IReview }>) => {
        const { bookId, review } = action.payload;
  
        // Find the book by ID
        const book = state.books.find((book) => book.guid === bookId);
  
        if (book) {
          // Add the new review to the book's reviews array
          book.reviews.push(review);
        }
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

      



    }




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
  export const { bookAdded, setGenreFilter, setPublicationYearFilter, addReview , updateBook, bookDeleted} = bookSlice.actions;
  export default bookSlice.reducer;

