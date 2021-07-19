import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';

export interface RegisterFormReducerInterface {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
}

const initialState: RegisterFormReducerInterface = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
};
interface addRegisterFromValuesInterface {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
}
export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        addRegisterFormValues: (
            state,
            action: PayloadAction<addRegisterFromValuesInterface>
        ) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.userName = action.payload.userName;
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        clearRegisterFormValues: (state) => {
            Object.assign(state, initialState);
        },
    },
});

export const {
    addRegisterFormValues,
    clearRegisterFormValues,
} = registerSlice.actions;

export const selectRegisterFormState = (state: RootState) => state.registerForm;

export default registerSlice.reducer;
