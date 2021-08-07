import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';

export interface IForgetPasswordState {
    volume: number;
    playing: boolean;
}

const initialState: IForgetPasswordState = {
    volume: 1.0,
    playing: false,
};

export const footerSlice = createSlice({
    name: 'footer/modifyControls',
    initialState,
    reducers: {
        updatePlayStatus: (state) => {
            state.playing = !state.playing;
        },
        updateVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
        },
    },
});

export const { updatePlayStatus, updateVolume } = footerSlice.actions;

export const selectFooterState = (state: RootState) => state.footerState;

export default footerSlice.reducer;
