import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface IForgetPasswordState {
    email: string;
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
    name: 'login_form',
    initialState,
    reducers: {
        addForgetFormValues: (
            state,
            action: PayloadAction<IAddForgetFormValues>
        ) => {
            state.email = action.payload.email;
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
            state.promise.error.message = action.payload.promise.error.message;
        },
    },
});

export const {
    addForgetFormValues,
    clearForgetFormValues,
    postForgetFormValues,
    postForgetFormErrorAndHasErrorMessage,
} = forgetSlice.actions;

export const selectLoginFormState = (state: RootState) => state.forgetForm;

export default forgetSlice.reducer;
