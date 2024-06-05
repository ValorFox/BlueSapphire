import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  BlogStatus: null,
  Options: [
    "Automobile",
    "Agriculture",
    "Electronics",
    "Economics",
    "Food",
    "Fashion",
    "LifeStyle",
    "Politics",
    "Weather",
    "World Affairs"
  ],
  Blogger: null,
};
const blogSlice = createSlice({
  name: "BlogData",
  initialState,
  reducers: {
    removeBlogger: (state) => {
      state.BlogStatus = false;
      state.Blogger = null;
    },

    setBlogger: (state, action) => {
      state.BlogStatus = true;
      state.Blogger = action.payload;
    },
  },
});

export const { removeBlogger, setBlogger } = blogSlice.actions;
export const blogReducer = blogSlice.reducer;
