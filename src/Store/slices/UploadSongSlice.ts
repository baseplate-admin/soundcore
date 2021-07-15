import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UploadSongStateInterface {
    filesArray: [
        song?: Object ,
    ]
}

interface SongInterface{
    song: Object
}

const initialState: UploadSongStateInterface = { 
    filesArray : [] 
};



export const uploadSongSlice = createSlice({
    name: 'song_slice',
    initialState,

    reducers: {
        getSongsArray: (state) => {
            return state
        },
        addSong: (state, action:PayloadAction<SongInterface> ) => {
            state.filesArray.push(action.payload.song)
        },removeSong: (state, action:PayloadAction<SongInterface>) => {
            // state.filesArray.filter()
        }
    },
});
