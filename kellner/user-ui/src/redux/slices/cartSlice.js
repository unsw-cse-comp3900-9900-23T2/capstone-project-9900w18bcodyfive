// Importing the create Slice function
import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
    products:[],
}


// defining the slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        //reducer for adding item to the cart
        addItem:(state, action) => {
            state.products.push(action.payload) 
        },
        //reducer for removing item from the cart
        removeItem:(state, action) => {
            state.products.splice(state.products.indexOf(action.payload), 1)
        }
    }
});

// Exporting the reducer
export default cartSlice.reducer;
// Exporting the actins as named exports
export const {addItem, removeItem} = cartSlice.actions;