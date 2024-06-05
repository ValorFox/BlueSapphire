import React from "react";
import { useSelector } from "react-redux";
import PostForm from "../components/PostForm/PostForm.jsx";
import Blogger_Login from "../components/Blogger-Login/Blogger_Login.jsx";

function AddPost_Page() {
  const status = useSelector((state) => state.blogReducer.BlogStatus);
  if (status) {
    return <PostForm />;
  } else {
    return <Blogger_Login />;
  }
}

export default AddPost_Page;
