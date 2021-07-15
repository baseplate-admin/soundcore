import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import navbarReducer from './slices/NavbarSlice';
import loginReducer from './slices/LoginSlice';
import registerReducer from './slices/RegisterSlice';

export const store = configureStore({
    reducer: {
        leftMenuHiddenOrNot: navbarReducer,
        loginForm: loginReducer,
        registerForm: registerReducer,
    },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
