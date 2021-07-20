import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com/todos',
    }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => ``,
        }),
    }),
});

export const { useGetUserQuery } = userApi;
