import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import navbarReducer from '../Components/App/Navbar/NavbarSlice';
import loginReducer from '../Pages/Login/LoginSlice';
import registerReducer from '../Pages/Register/RegisterSlice';

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
