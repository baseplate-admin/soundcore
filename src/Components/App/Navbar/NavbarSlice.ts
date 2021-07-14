import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../Store/store';

export interface NavbarState {
    isHidden: boolean;
}

const initialState: NavbarState = { isHidden: false };

export const navbarSlice = createSlice({
    name: 'left_menu_hidden_or_not',
    initialState,
    reducers: {
        leftMenuHidden: (state) => {
            state.isHidden = false;
        },
        leftMenuShown: (state) => {
            state.isHidden = true;
        },
    },
});

export const { leftMenuHidden, leftMenuShown } = navbarSlice.actions;

export const selectLeftMenuState = (state: RootState) =>
    state.leftMenuHiddenOrNot;

export default navbarSlice.reducer;
