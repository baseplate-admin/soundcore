import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import navbarReducer from './Slices/NavbarSlice';
import loginReducer from './Slices/LoginSlice';
import registerReducer from './Slices/RegisterSlice';
import ForgetReducer from './Slices/ForgetSlice';

export const store = configureStore({
    reducer: {
        leftMenuHiddenOrNot: navbarReducer,
        loginForm: loginReducer,
        registerForm: registerReducer,
        forgetForm: ForgetReducer,
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
