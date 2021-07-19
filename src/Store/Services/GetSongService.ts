import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const songsApi = createApi({
    reducerPath: 'music',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com/todos',
    }),
    endpoints: (builder) => ({
        getSongs: builder.query<Array<object>, void>({
            query: () => ``,
        }),
    }),
});

export const { useGetSongsQuery } = songsApi;
