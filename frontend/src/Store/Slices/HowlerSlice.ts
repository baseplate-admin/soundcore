import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';

export interface IHowlerState {
    howler: object;
    added: Boolean;
}

const initialState: IHowlerState = {
    howler: Object,
    added: false,
};

export const howlerSlice = createSlice({
    name: 'howler',
    initialState,
    reducers: {
        setHowlerObject: (state, action: PayloadAction<IHowlerState>) => {
            state.howler = action.payload.howler;
            state.added = !state.added;
        },
    },
});

export const { setHowlerObject } = howlerSlice.actions;

export const selectLoginFormState = (state: RootState) => state.howlerState;

export default howlerSlice.reducer;
