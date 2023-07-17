// Importing the create Slice function
import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
    tId:null
}

// defining the slice
const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        //reducer for adding table
        addTable:(state, action) => {
            state.tId = action.payload.tId
        },
        //reducer for removing table and checkout
        removeTable:(state) => {
            state.tId = null
        }
    }
});

// Exporting the reducer
export default tableSlice.reducer;
// Exporting the actins as named exports
export const {addTable, removeTable} = tableSlice.actions;