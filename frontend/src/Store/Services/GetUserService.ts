import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetJWTTokenInLocalStorage } from '../../Functions/Helpers/JWTCookie';

export const userApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/api/v1/users/info/',
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
        getUser: builder.query({
            query: () => ``,
        }),
    }),
});

export const { useGetUserQuery } = userApi;
