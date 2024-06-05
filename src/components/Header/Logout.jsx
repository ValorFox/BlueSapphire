import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../Store/authSlice";
import authService from "../../appwrite/auth";
import { removeBlogger } from "../../Store/BlogSlice";
import { useNavigate } from "react-router-dom";

function Logout({ className = "" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout() {
    authService.logout().then(() => {
      dispatch(logout());
      dispatch(removeBlogger());
      navigate("/");
    });
  }
  return (
    <div className="">
      <button
        onClick={handleLogout}
        className={`duration-200 lg:text-base font-semibold lg:font-normal ${className}`}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
