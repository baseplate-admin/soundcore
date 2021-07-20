import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import navbarReducer from './Slices/NavbarSlice';
import loginReducer from './Slices/LoginSlice';
import registerReducer from './Slices/RegisterSlice';
import ForgetReducer from './Slices/ForgetSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { songsApi } from './Services/GetSongService';
import { userApi } from './Services/GetUserService';

export const store = configureStore({
    reducer: {
        leftMenuHiddenOrNot: navbarReducer,
        loginForm: loginReducer,
        registerForm: registerReducer,
        forgetForm: ForgetReducer,
        [songsApi.reducerPath]: songsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(songsApi.middleware, userApi.middleware),
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
