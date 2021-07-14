import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../Store/store';

export interface LoginState {
    isSuccess: boolean;
    hasError: boolean;
    errorMessage: string;
    username: string;
    password: string;
}

const initialState: LoginState = {
    isSuccess: false,
    hasError: false,
    errorMessage: '',
    username: '',
    password: '',
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
            state.isSuccess = true;
        },
        postLoginFormErrorAndHasErrorMessage: (
            state,
            action: PayloadAction<LoginState>
        ) => {
            state.hasError = true;
            state.errorMessage = action.payload.errorMessage;
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
