import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';

interface IHowlerState {
    howler: Array<number>;
}

const initialState: IHowlerState = {
    howler: [],
};

export const howlerSlice = createSlice({
    name: 'howler',
    initialState,
    reducers: {
        clearHowlerObjects: (state) => {
            state = initialState;
        },
        setHowlerObject: (state, action: PayloadAction<number>) => {
            state.howler.push(action.payload);
        },
    },
});

export const { setHowlerObject, clearHowlerObjects } = howlerSlice.actions;

export const selectHowlerState = (state: RootState) => state.howlerState;

export default howlerSlice.reducer;
