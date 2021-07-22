import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetJWTTokenInLocalStorage } from '../../Functions/Helpers/JWTCookie';
import { APIPath, APIUrl } from '../../Routes';
export const userApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({
        baseUrl: `${APIUrl}${APIPath.USER_INFO_ENDPOINT}`,
        prepareHeaders: (headers) => {
            const token = GetJWTTokenInLocalStorage();
            if (!token) {
                console.error(`Token not Found`);
            }
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            console.log(`${APIUrl}${APIPath.USER_INFO_ENDPOINT}`);

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
