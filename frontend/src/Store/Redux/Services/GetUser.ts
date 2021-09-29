import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetJWTTokenInLocalStorage } from '../../../Functions/Helpers/LocalStorage/JWTCookie';
import { APIUrl } from '../../../Config/App';
import { APIPath } from '../../../Config/Api';

export const userApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({
        baseUrl: `${APIUrl}${APIPath.USER_INFO_ENDPOINT}`,
        prepareHeaders: (headers) => {
            const token = GetJWTTokenInLocalStorage();

            if (token) {
                headers?.set('Authorization', `Bearer ${token}`);
            } else {
                console.error('Token Not Found');
            }
            // If we have a token set in state, let's assume that we should be passing it.
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
