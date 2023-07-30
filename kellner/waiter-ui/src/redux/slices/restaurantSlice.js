// Importing the create Slice function
import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
    rId: '',
    rName: ''
}

// defining the slice
const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        addRestaurant: (state, action) => {
            console.log(action.payload)
            state.rId = action.payload.rId
            state.rName = action.payload.rName
        },
        removeRestaurant: (state, action) => {
            state.rId = ''
            state.rName = ''
        }
    }
});

// exporting the reducer as default export
export default restaurantSlice.reducer;
export const{addRestaurant, removeRestaurant} = restaurantSlice.actions;