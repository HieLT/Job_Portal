import {createSlice} from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        tab: 'information',
        authUser: {}
    },
    reducers: {
        setTab: (state, action) => ({
            ...state,
            tab: action.payload
        }),
        setAuthUser: (state, action) => ({
            ...state,
            authUser: action.payload
        })
    }
})

export const {
    setAuthUser,
    setTab
} = profileSlice.actions

export default profileSlice.reducer;
