// Importing the create Slice function
import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
    rId: '',
    rName: '',
    rTableIds:[]
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
            state.rTableIds = action.payload.rTableIds
        },
        removeRestaurant: (state, action) => {
            state.rId = ''
            state.rName = ''
            state.rTableIds = []
        }
    }
});

// exporting the reducer as default export
export default restaurantSlice.reducer;
export const{addRestaurant, removeRestaurant} = restaurantSlice.actions;