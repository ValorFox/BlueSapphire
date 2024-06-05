import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
}
const authSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },

    }
}
)

export const { login, logout} = authSlice.actions;
export const authReducer = authSlice.reducer
