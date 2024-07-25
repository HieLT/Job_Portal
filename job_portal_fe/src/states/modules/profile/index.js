import {createSlice} from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        tab: 'information'
    },
    reducers: {
        setTab: (state, action) => ({
            ...state,
            tab: action.payload
        })
    }
})

export const {
    setTab
} = profileSlice.actions

export default profileSlice.reducer;
