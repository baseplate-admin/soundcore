import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';

export interface LoginState {
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

export const loginSlice = createSlice({
    name: 'login_form',
    initialState,
    reducers: {
        postLoginFormSuccess: (state) => {
            state.promise.success.value = true;
        },
        postLoginFormErrorAndHasErrorMessage: (
            state,
            action: PayloadAction<LoginState>
        ) => {
            state.promise.error.value = true;
            state.promise.error.message =
                action?.payload?.promise?.error?.message;
        },
    },
});

export const { postLoginFormSuccess, postLoginFormErrorAndHasErrorMessage } =
    loginSlice?.actions;

export const selectLoginFormState = (state: RootState) => state?.loginForm;

export default loginSlice?.reducer;
