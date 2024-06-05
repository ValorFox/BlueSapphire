import React, { useEffect, useRef, useState } from "react";
import Input from "./Input";
import authService from "../appwrite/auth";
import { set, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Store/authSlice";
import { useToast } from "./ui/use-toast";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [wait, setWait] = useState(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signUp = async (data) => {
    setWait(true);

    const newUserData = await authService.createAccount(data);
    if (newUserData) {
      const loggedInUserData = await authService.getCurrentUser();

      if (loggedInUserData) {
        toast({
          title: `Welcome ${data.name}`,
          description: "Your account is created successfully",
        });
        setWait(false); // Set to false to indicate loading is done
        dispatch(login(loggedInUserData));
        navigate("/");
      } else {
        setWait(false);
        toast({
          variant: "destructive",
          title: `Error fetching user data after account creation.`,
          description: "There was a problem with your request.",
        });
        console.error("Error fetching user data after account creation.");
      }
    } else {
      setWait(false);
      toast({
        variant: "destructive",
        title: `Error creating account.`,
        description: "There was a problem with your request.",
      });
      console.error("Error creating account.");
    }
  };

  return (
    <>
      <div className="lg:w-[25vw] w-[90%] mx-auto mt-[5rem] p-4 shadow-xl bg-[#111111] shadow-black/30 relative mb-52">
        <h2 className="text-left font-light text-4xl p-4 ">SignUp</h2>
        <form
          onSubmit={handleSubmit(signUp)}
          className="flex flex-col justify-between w-full mt-5"
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
          {errors.email && (
            <p className="text-red-400 animate-pulse mb-4">
              {errors.email.message}
            </p>
          )}
          <Input
            placeholder="username"
            type="text"
            {...register("name", {
              required: "username is required",
              minLength: {
                value: 4,
                message: "Minimim 4 character Username is required",
              },
            })}
          />

          <Input
            placeholder="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
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
            className="bg-sky-400 text-black rounded-md p-2 hover:bg-sky-600 duration-200 mt-3 text-lg"
          >
            Sign
          </button>
          <p className="mt-8 text-center text-base text-neutral-300">
            Already have an account?&nbsp;
            <Link
              to={"/login"}
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
        {wait && (
          <div className="w-full h-full bg-black/60 absolute top-0 left-0 ">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-cyan-500 motion-reduce:animate-[spin_1.5s_linear_infinite] mt-[50%]"
              role="status"
            ></div>
          </div>
        )}
      </div>
    </>
  );
}

export default SignIn;
