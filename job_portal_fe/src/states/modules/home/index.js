import {createSlice} from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        keySearch: '',
    },
    reducers: {
        setKeySearch: (state, action) => ({
            ...state,
            keySearch: action.payload
        })
    }
})

export const {
    setKeySearch
} = homeSlice.actions

export default homeSlice.reducer;
