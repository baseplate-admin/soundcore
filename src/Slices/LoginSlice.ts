import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface LoginState {
    username: string;
    password: string;
    promise: {
        success: {
            value: boolean;
        };
        error: {
            value: boolean;
            message: string;
        };
    };
}

const initialState: LoginState = {
    username: '',
    password: '',
    promise: {
        success: {
            value: false,
        },
        error: {
            value: false,
            message: '',
        },
    },
};

interface addLoginFormValuesInterface {
    username: string;
    password: string;
}

export const loginSlice = createSlice({
    name: 'login_form',
    initialState,
    reducers: {
        addLoginFormValues: (
            state,
            action: PayloadAction<addLoginFormValuesInterface>
        ) => {
            state.username = action.payload.username;
            state.password = action.payload.password;
        },
        clearLoginFormValues: (state) => {
            Object.assign(state, initialState);
        },
        postLoginFormSuccess: (state) => {
            state.promise.success.value = true;
        },
        postLoginFormErrorAndHasErrorMessage: (
            state,
            action: PayloadAction<LoginState>
        ) => {
            state.promise.error.value = true;
            state.promise.error.message = action.payload.promise.error.message;
        },
    },
});

export const {
    addLoginFormValues,
    clearLoginFormValues,
    postLoginFormSuccess,
    postLoginFormErrorAndHasErrorMessage,
} = loginSlice.actions;

export const selectLoginFormState = (state: RootState) => state.loginForm;

export default loginSlice.reducer;
