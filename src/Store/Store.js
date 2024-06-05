import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { blogReducer } from "./BlogSlice"

const combinedReducers = combineReducers(
    {
        "authReducer": authReducer,
        "blogReducer": blogReducer,
    }
)
export const store = configureStore({
    reducer: combinedReducers,
})