import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import navbarReducer from './Slices/Navbar';
import loginReducer from './Slices/Login';
import registerReducer from './Slices/Register';
import forgetReducer from './Slices/Forget';
import footerReducer from './Slices/Footer';

import { songsApi } from './Services/GetSong';
import { userApi } from './Services/GetUser';

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
            serializableCheck: true, // Enable Serializable Check because we are not storing howler object in database.
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
