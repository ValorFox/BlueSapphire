import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./Store/authSlice";
import BloggerService from "./appwrite/Blog_Account";
import { setBlogger } from "./Store/BlogSlice";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((data) => {
        if (data) {
          dispatch(login(data));
          BloggerService.GetBloggerStatus(data.$id).then((data) => {
            if (data.total > 0) {
              dispatch(setBlogger(data.documents[0]));
            }
          });
        } else dispatch(logout());
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Toaster />
      <Footer />
    </>
  );
}

export default App;
