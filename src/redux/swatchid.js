import { createSlice } from "@reduxjs/toolkit";

export const swatchSlice = createSlice({
    name: "swatchid",
    initialState: {
        value: [],
    },
    reducers: {
        set_swatchid: (state, action) => {
            state.value = action.payload;
        },
    },
});
  
// categorySlice.actions 

export const { set_swatchid } = swatchSlice.actions;
export default swatchSlice.reducer;