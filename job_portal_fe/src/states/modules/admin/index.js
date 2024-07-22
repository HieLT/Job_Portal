import {createSlice} from "@reduxjs/toolkit";
import { getAllCompany } from "../../../api/admin";

const homeSlice = createSlice({
    name: 'admin',
    initialState: {
        allCompany:[],
        allCandidate:[]
    },
    reducers: {
        startRequestGetAllCompany : (state) =>({
            ...state
        }),
        
        startRequestGetAllCompanySuccess : (state,action) =>({
            ...state,
            allCompany : action.payload
        }),

        startRequestGetAllCompanyFail : (state) =>({
            ...state,
            allCompany : []
        }), 

        startRequestGetAllCandidate : (state) =>({
            ...state
        }),
        
        startRequestGetAllCandidateSuccess : (state,action) =>({
            ...state,
            allCandidate : action.payload
        }),

        startRequestGetAllCandidateFail : (state) =>({
            ...state,
            allCandidate : []
        }),
    }
})

export const {
    startRequestGetAllCompany, startRequestGetAllCompanySuccess, startRequestGetAllCompanyFail,
    startRequestGetAllCandidate , startRequestGetAllCandidateSuccess , startRequestGetAllCandidateFail
} = homeSlice.actions

export default homeSlice.reducer;
