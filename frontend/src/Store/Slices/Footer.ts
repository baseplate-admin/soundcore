import { RootState } from '../Store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IForgetPasswordState {
    song: {
        name: string;
        artist: string;
        image: string | undefined; // Base64
        sampleRate: string;

        control: {
            total: number; // <-- Means song total duration (seconds)
            current: number; // <-- Means song Current duration (seconds)
        };
        // Song global attars such as play/pause and volume
        global: {
            playing: boolean;
            // volume: number;
        };
    };
}

const initialState: IForgetPasswordState = {
    song: {
        name: 'Song Name',
        artist: 'Song Artist',
        image: '',
        sampleRate: 'Sample Rate',

        control: {
            total: 0,
            current: 0,
        },
        global: {
            playing: false,
            // volume: 0.5, // Half Volume
        },
    },
};

interface ISongAdd {
    name: string;
    artist: string;
    image: string | undefined;
    sampleRate: string;
}

export const footerSlice = createSlice({
    name: 'footer/modifyControls',
    initialState,
    reducers: {
        updateStatusToPlay: (state) => {
            state.song.global.playing = true;
        },
        updateStatusToPause: (state) => {
            state.song.global.playing = false;
        },

        updateSongState: (state, action: PayloadAction<ISongAdd>) => {
            state.song.name = action.payload.name;
            state.song.artist = action.payload.artist;
            state.song.sampleRate = action.payload.sampleRate;
            state.song.image = action.payload.image;
        },
        updateTotalSeconds: (state, action: PayloadAction<number>) => {
            state.song.control.total = action.payload;
        },
        updateCurrentSeconds: (state, action: PayloadAction<number>) => {
            state.song.control.current = action.payload;
        },
    },
});

export const {
    updateStatusToPlay,
    updateStatusToPause,
    updateSongState,
    updateTotalSeconds,
    updateCurrentSeconds,
} = footerSlice.actions;

export const selectFooterState = (state: RootState) => state.footerState;

export default footerSlice.reducer;
