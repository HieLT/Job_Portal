import {createSlice} from "@reduxjs/toolkit";

const conversationSlice = createSlice({
    name: 'conversation',
    initialState: {
        conversations: [],
        isLoadingGetConversations: false,
        isNewConversation: false,

        oldMessages: [],
        isLoadingGetOldMessages: false,
        receiverAccount: null,
        senderAccount: null,

        activeConversation: {},
        activeConversationId: null,
        isKeepScroll: false,

        appliedCompanies: [],
        isLoadingGetAppliedCompanies: false
    },
    reducers: {
        appendMessages: (state, action) => ({
            ...state,
            oldMessages: [...state.oldMessages, action.payload]
        }),
        setIsNewConversation: (state, action) => ({
            ...state,
            isNewConversation: action.payload
        }),
        setActiveConversation: (state, action) => ({
            ...state,
            activeConversation: action.payload
        }),
        setIsKeepScroll: (state, action) => ({
            ...state,
            isKeepScroll: action.payload
        }),

        startRequestGetConversations: (state) => ({
            ...state,
            isLoadingGetConversations: true
        }),
        requestGetConversationsSuccess: (state, action) => ({
            ...state,
            isLoadingGetConversations: false,
            conversations: action.payload
        }),
        requestGetConversationsFail: (state) => ({
            ...state,
            isLoadingGetConversations: false,
        }),

        startRequestGetOldMessages: (state) => ({
            ...state,
            isLoadingGetOldMessages: true
        }),
        requestGetOldMessagesSuccess: (state, action) => {
            const activeUserId = state.activeConversation?._id
            const isNewConversation = state.isNewConversation

            return ({
                ...state,
                isLoadingGetOldMessages: false,
                oldMessages: action.payload.messages,
                receiverAccount: isNewConversation ? action.payload.participants[1] : (action.payload.participants?.find(item => item?.candidate ?
                    item?.candidate?._id === activeUserId : item?.company?._id === activeUserId)),
                senderAccount: action.payload.participants?.find(item => item?.candidate ?
                    item?.candidate?._id !== activeUserId : item?.company?._id !== activeUserId),
                activeConversationId: action.payload._id
            })
        },
        requestGetOldMessagesFail: (state) => ({
            ...state,
            isLoadingGetOldMessages: false,
        }),

        startRequestGetAppliedCompanies: (state) => ({
            ...state,
            isLoadingGetAppliedCompanies: true
        }),
        requestGetAppliedCompaniesSuccess: (state, action) => ({
            ...state,
            isLoadingGetAppliedCompanies: false,
            appliedCompanies: action.payload
        }),
        requestGetAppliedCompaniesFail: (state) => ({
            ...state,
            isLoadingGetAppliedCompanies: false,
        }),

        setOldMessages: (state, action) => ({
            ...state,
            oldMessages: action.payload
        })
    }
})

export const {
    appendMessages,
    setOldMessages,
    setIsNewConversation,
    setIsKeepScroll,
    setActiveConversation,
    startRequestGetConversations,
    requestGetConversationsSuccess,
    requestGetConversationsFail,
    startRequestGetOldMessages,
    requestGetOldMessagesSuccess,
    requestGetOldMessagesFail,
    startRequestGetAppliedCompanies,
    requestGetAppliedCompaniesSuccess,
    requestGetAppliedCompaniesFail,
} = conversationSlice.actions

export default conversationSlice.reducer;
