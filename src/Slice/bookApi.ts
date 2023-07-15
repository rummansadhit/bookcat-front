// api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create the API instance
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (book) => ({
        url: '/books',
        method: 'POST',
        body: book,
      }),
    }),
  }),
});

// Export the hooks generated by RTK Query
export const { useAddBookMutation } = api;