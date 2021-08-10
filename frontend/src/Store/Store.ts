import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import navbarReducer from './Slices/NavbarSlice';
import loginReducer from './Slices/LoginSlice';
import registerReducer from './Slices/RegisterSlice';
import forgetReducer from './Slices/ForgetSlice';
import footerReducer from './Slices/FooterSlice';

import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { songsApi } from './Services/GetSongService';
import { userApi } from './Services/GetUserService';

export const store = configureStore({
    reducer: {
        leftMenuHiddenOrNot: navbarReducer,
        loginForm: loginReducer,
        registerForm: registerReducer,
        forgetForm: forgetReducer,
        footerState: footerReducer,
        [songsApi.reducerPath]: songsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: { extraArgument: songsApi, userApi },
            // I dont know how to fix this for now. ETA = Unknown
            serializableCheck: true, // Disable Serializable Check because we are storing howler object in database.
        }),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
setupListeners(store.dispatch);
