import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
    }),
    addBook: builder.mutation({
      query: (book) => ({
        url: '/books',
        method: 'POST',
        body: book,
      }),
    }),

  }),
});

export const { useGetBooksQuery, useAddBookMutation } = api;
