import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBook, IReview } from './bookSlice';

// Create the API instance
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://bookcat-backend.vercel.app' }),
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (book) => ({
        url: '/books',
        method: 'POST',
        body: book,
      }),
    }),

    getBooks: builder.query({
      query: () => '/books',
    }),

    getReviews: builder.query({
      query: () => '/reviews',
    }),

    deleteBook: builder.mutation<IBook,  { bookId: string  }>({
      query: ({bookId}) => ({
        url: `/books/${bookId}`,
        method: 'DELETE',
      }),
    }),
    

    updateBook: builder.mutation<IBook, { bookId: string ; book: Partial<IBook> }>({
      query: ({ bookId, book }) => ({
        url: `/books/edit/${bookId}`,
        method: 'PATCH',
        body: book,
      }),
    }),







    addReview: builder.mutation<IBook, { bookId: string; book: IBook }>({
      query: ({ bookId, book }) => ({
        url: `/books/${bookId}`,
        method: 'PATCH',
        body: { ...book },
      }),
    }),
  }),
  
});

// Export the hooks generated by RTK Query
export const { useAddBookMutation, useGetBooksQuery, useAddReviewMutation, useUpdateBookMutation ,useDeleteBookMutation} = api;
