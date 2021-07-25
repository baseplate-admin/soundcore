import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Howl } from 'howler';
import { RootState } from '../Store';

interface IHowlerState {
    howler: Array<object>;
}

const initialState: IHowlerState = {
    howler: [],
};

export const howlerSlice = createSlice({
    name: 'howler',
    initialState,
    reducers: {
        setHowlerObject: (state, action: PayloadAction<Howl>) => {
            state.howler.push(action.payload);
        },
    },
});

export const { setHowlerObject } = howlerSlice.actions;

export const selectHowlerState = (state: RootState) => state.howlerState;

export default howlerSlice.reducer;
