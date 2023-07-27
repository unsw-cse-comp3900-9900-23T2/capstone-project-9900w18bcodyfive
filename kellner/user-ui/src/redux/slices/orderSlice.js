// Importing the create Slice function
import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
    orderNo: null,
}


// defining the slice
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        //reducer for adding item to the cart
        addOrderNo:(state, action) => {
            state.orderNo = action.payload.orderNo
        },
        //reducer for removing item from the cart
        removeOrderNo:(state) => {
            state.orderNo = null
        }
    }
});

// Exporting the reducer
export default orderSlice.reducer;
// Exporting the actins as named exports
export const {addOrderNo, removeOrderNo} = orderSlice.actions;