import React, { useRef, useState } from "react";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Store/authSlice.js";
import authServive from "../appwrite/auth.js";
import { useToast } from "./ui/use-toast";

function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [wait, setWait] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  function handleLogin(data) {
    try {
      setWait(!wait);
      authServive
        .login(data)
        .then((data) => {
          if (data) {
            toast({
              title: `Welcome user`,
            });
            setWait(false);
            dispatch(login(data));
            navigate("/");
          }
        })
        .catch((error) => {
          setWait(false);
          toast({
            title: `Invalid Password or Email`,
            variant: "destructive",
          });
          console.log(error);
        });
    } catch (error) {
      setWait(false);
      console.log(error);
    }
  }

  return (
    <>
      <div className=" w-[90%] lg:w-[25vw] mt-[6rem] p-4 shadow-xl bg-[#131313] shadow-black/30 mx-auto relative mb-52">
        <h1 className="text-left font-light text-4xl p-1 mb-12 mt-2">Login</h1>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col mt-5 "
        >
          {errors.name && (
            <p className="text-red-400 animate-pulse mb-4">
              {errors.name.message}
            </p>
          )}
          {errors.password && (
            <p className="text-red-400 animate-pulse mb-4">
              {errors.password.message}
            </p>
          )}
          <Input
            placeholder="email"
            type="email"
            {...register("email", {
              required: "username is required",
              minLength: {
                value: 4,
                message: "Minimim 4 character Username is required",
              },
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            placeholder="password"
            type="password"
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 4,
                message: "At least 4 character password is required",
              },
            })}
          />
          <button
            type="submit"
            className="bg-sky-400 text-black rounded-md p-2 hover:bg-sky-600 duration-200 mt-5 text-md"
          >
            Login
          </button>
          <p className="mt-8 text-center text-basetext-neutral-300">
            Don&apos;t have any account?&nbsp;
            <Link
              to={"/signup"}
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
        {wait && (
          <div className="w-full h-full bg-black/60 absolute top-0 left-0">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-cyan-500 motion-reduce:animate-[spin_1.5s_linear_infinite] mt-[45%]"
              role="status"
            ></div>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
