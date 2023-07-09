// Importing the create Slice function
import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
    isFetching: false,
    mId: '',
    mName: '',
    mEmail: '',
    token: null,
    error: ''
}

// defining the slice
const managerSlice = createSlice({
    name: 'manager',
    initialState,
    reducers: {
        loggingIn: (state) => {
            state.isFetching = true
        },
        loggedIn: (state, action) => {
            console.log(action.payload)
            state.isFetching = false
            state.mId = action.payload.mId
            state.mName = action.payload.mName
            state.mEmail = action.payload.mEmail
            state.token = action.payload.token
            state.error = ''
        },
        loggingError: (state, action) => {
            state.isFetching = false
            state.mId = ''
            state.mName = ''
            state.mEmail = ''
            state.token = null
            state.error = action.payload.errorMessage
        },
        loggedOut: (state) =>{
            state.isFetching = false
            state.mId = ''
            state.mName = ''
            state.mEmail = ''
            state.token = null
        }
    }
});

// Exporting the actions
export default managerSlice.reducer;
export const{loggingIn, loggedIn, loggingError, loggedOut} =  managerSlice.actions;