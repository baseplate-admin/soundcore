import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetJWTTokenInLocalStorage } from '../../Functions/Helpers/JWTCookie';
import { APIPath, APIUrl } from '../../Routes';

export const songsApi = createApi({
    reducerPath: 'music',
    baseQuery: fetchBaseQuery({
        baseUrl: `${APIUrl}${APIPath.FETCH_SONG_ENDPOINT}`,
        prepareHeaders: (headers) => {
            const token = GetJWTTokenInLocalStorage();
            if (!token) {
                console.error(`Token not Found`);
            }
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),

    endpoints: (builder) => ({
        getSongs: builder.query({
            query: () => ``,
        }),
    }),
});

export const { useGetSongsQuery } = songsApi;
