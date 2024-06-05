import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import service from "../../appwrite/config";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.authReducer);
  const bloggerStatus = useSelector((state) => state.blogReducer);
  const [menu, setMenu] = useState(false);
  const [Blogger, setBlogger] = useState(false);
  const [showinfo, setShowinfo] = useState(false);

  useEffect(() => {
    if (bloggerStatus.BlogStatus === true) {
      setBlogger(bloggerStatus.Blogger);
    }
  }, [bloggerStatus]);

  const handleClick = () => {
    setMenu(!menu);
  };

  const CategoryPosts = (category) => {
    navigate(`/category/${category}`);
  };

  const navOptions = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "About",
      slug: "/about",
      active: true,
    },
    {
      name: "Contact",
      slug: "/contact",
      active: true,
    },

    {
      name: "Login",
      slug: "/login",
      active: !authStatus.status,
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !authStatus.status,
    },
    {
      name: "AddPost",
      slug: "/addpost",
      active: authStatus.status,
    },
  ];
  //
  return (
    <>
      <div
        className="w-full p-1 h-16 flex items-center justify-between lg:px-16 bg-black/50 
      "
      >
        <Link className="h-12 w-[15%] lg:hidden ">
          <img
            src={"Images/gmenu.png"}
            alt="hamburger Icon"
            onClick={handleClick}
            className="w-full h-full object-contain object-center p-2 text-white"
          />
        </Link>

        <div className="text-cyan-300 lg:ml-3 w-[3rem] ">
          <Link to={"/"}>
            <p>logo</p>
          </Link>
        </div>

        <ul className="lg:flex justify-between p-2 hidden text-zinc-300 ml-auto items-center">
          {navOptions.map(
            (option) =>
              option.active && (
                <li
                  className="mr-8"
                  key={option.name}
                  onClick={() => setShowinfo(false)}
                >
                  <button
                    onClick={() => navigate(option.slug)}
                    className="hover:text-neutral-400 duration-200"
                  >
                    {option.name}
                  </button>
                </li>
              )
          )}

          {authStatus.status && (
            <Logout className="hover:text-neutral-400 text-lg mr-8" />
          )}
        </ul>
        {bloggerStatus.Options && (
          <div className="lg:mr-auto">
            <Select
              required={true}
              onValueChange={(value) => CategoryPosts(value)}
            >
              <SelectTrigger className="lg:w-[11rem] w-[7rem]  h-[2.5rem]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-black/50">
                  {bloggerStatus.Options.map((option) => (
                    <SelectItem value={option} key={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectSeparator />
                <SelectItem value="Others" className="bg-black/50">
                  Others
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div
          className="w-[2rem] h-[2rem] rounded-full overflow-hidden lg:w-[2.5rem] lg:h-[2.5rem] lg:mr-0 mr-4"
          onClick={() => setShowinfo(!showinfo)}
        >
          <img
            src={
              Blogger
                ? service.getBloggerAvatar(Blogger.Blogger_Avatar)
                : "public/Images/Pic2.webp"
            }
            alt="img"
            className="w-full h-full object-center object-cover
          cursor-pointer lg:inline hidden"
          />
          <Link to={"/bloggerinfo"}>
            <img
              src={
                Blogger
                  ? service.getBloggerAvatar(Blogger.Blogger_Avatar)
                  : "public/Images/Pic2.webp"
              }
              alt="img"
              className="w-full h-full object-center object-cover
          cursor-pointer lg:hidden inline"
            />
          </Link>
        </div>

        {/* responsive Navbar   */}

        {menu ? (
          <div className="fixed bg-[#2e2e2e] inset-0 z-10 flex flex-col lg:hidden">
            <div className="w-full h-16 bg-[#222222] flex items-center justify-between p-2">
              <Link className="h-full w-[15%] lg:hidden gap-5">
                <img
                  src={menu ? "Images/cross.png" : "Images/gmenu.png"}
                  alt="hamburger Icon"
                  onClick={handleClick}
                  className="w-full h-full object-contain object-center p-2 text-white"
                />
              </Link>

              <div
                className="w-[2rem] h-[2rem] rounded-[100%] overflow-hidden mr-2"
                onClick={handleClick}
              ></div>
            </div>

            <ul className="w-full p-4 font-semibold mt-8 text-neutral-400 mx-auto">
              {navOptions.map(
                (option) =>
                  option.active && (
                    <li
                      className="mb-6 text-xl mx-auto rounded-lg py-2"
                      key={option.name}
                    >
                      <button
                        onClick={() => {
                          navigate(option.slug);
                          setMenu(!menu);
                        }}
                        className="duration-200 hover:text-neutral-700"
                      >
                        {option.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && <Logout className="text-xl" />}
            </ul>
          </div>
        ) : null}
      </div>
      {/* --------------------------------- ShowUserinfo  ------------------------------------ */}

      {showinfo && (
        <div className="absolute w-[20rem] bg-black/80 right-4 top-20 rounded-xl text-neutral-200 hidden lg:inline z-50 overflow-hidden backdrop-blur-md">
          <div className="w-full flex">
            <img
              src={
                Blogger
                  ? service.getBloggerAvatar(Blogger.Blogger_Avatar)
                  : "public/Images/Pic2.webp"
              }
              alt="img"
              className="w-[3rem] h-[3rem] object-center object-cover cursor-pointer m-4 rounded-full bg-slate-100"
            />

            <div className="flex flex-col p-3 w-full px-8 text-right">
              <p>{authStatus.status ? authStatus.userData.name : "Guest"}</p>
              <p>
                {authStatus.status
                  ? authStatus.userData.email
                  : "user@gmail.com"}
              </p>
            </div>
          </div>
          <hr />
          <div className="w-full h-20 px-3 py-1 text-left m-2">
            <p>My Blogging Account</p>
            {/* <p className=" mt-2 text-lg bg-white/15 text-center mr-2 p-1 rounded-md cursor-pointer">
              {bloggerStatus.BlogStatus
                ? bloggerStatus.Blogger.Blogger_Name
                : "Create Blogging Account"}
            </p> */}
            {bloggerStatus.BlogStatus ? (
              <Link to={"/bloggerinfo"}>
                <p className=" mt-2 text-lg bg-white/15 text-center mr-2 p-1 rounded-md cursor-pointer">
                  {bloggerStatus.Blogger.Blogger_Name}
                </p>
              </Link>
            ) : (
              <Link to={"/addpost"}>
                <p className=" mt-2 text-md bg-white/15 text-center mr-2 p-1 rounded-md cursor-pointer">
                  Create Blogging Account
                </p>
              </Link>
            )}
          </div>
          <hr />

          {authStatus.status ? (
            <Logout
              className={
                "bg-rose-600 w-[95%] mx-auto p-2 text-black hover:bg-rose-800 mb-3 rounded text-[2rem] mt-4"
              }
            />
          ) : (
            <ul className="w-full mt-4 mb-4 text-left text-lg px-3 cursor-pointer">
              <li
                className="p-2 bg-black/80 hover:bg-white/5  text-neutral-300 mb-2 rounded border-neutral-600 border duration-150"
                onClick={() => {
                  setShowinfo(false);
                  navigate("/login");
                }}
              >
                Login
              </li>
              <li
                className="hover:bg-slate-700 p-2 bg-slate-500 text-black rounded duration-150"
                onClick={() => {
                  setShowinfo(false);
                  navigate("/signup");
                }}
              >
                SignUp
              </li>
            </ul>
          )}
        </div>
      )}
    </>
  );
}

export default Header;
