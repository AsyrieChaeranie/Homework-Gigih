import { createSlice } from "@reduxjs/toolkit";

export const tokenhSlice = createSlice({
    name: "token",
    initialState: {
        value: ''
    },
    reducers: {
        tokenAuth: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { tokenAuth } = tokenhSlice.actions;
export default tokenhSlice.reducer