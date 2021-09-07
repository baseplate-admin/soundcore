import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';

export interface IForgetPasswordState {
    email: string;
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

const initialState: IForgetPasswordState = {
    email: '',
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

interface IAddForgetFormValues {
    email: string;
}

export const forgetSlice = createSlice({
    name: 'forms/login_form',
    initialState,
    reducers: {
        addForgetFormEmailValue: (
            state,
            action: PayloadAction<IAddForgetFormValues>
        ) => {
            state.email = action?.payload.email;
        },
        clearForgetFormValues: (state) => {
            Object.assign(state, initialState);
        },
        postForgetFormValues: (state) => {
            state.promise.success.value = true;
        },
        postForgetFormErrorAndHasErrorMessage: (
            state,
            action: PayloadAction<IForgetPasswordState>
        ) => {
            state.promise.error.value = true;
            state.promise.error.message =
                action?.payload?.promise?.error?.message;
        },
    },
});

export const {
    addForgetFormEmailValue,
    clearForgetFormValues,
    postForgetFormValues,
    postForgetFormErrorAndHasErrorMessage,
} = forgetSlice?.actions;

export const selectForgetFormState = (state: RootState) => state?.forgetForm;

export default forgetSlice?.reducer;
