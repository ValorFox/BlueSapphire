import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Input, PostForm } from "../Index";
import { useForm } from "react-hook-form";
import blogger_service from "../../appwrite/Blog_Account";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { setBlogger } from "../../Store/BlogSlice";
import { useToast } from "../ui/use-toast";

function Blogger_login() {
  const user = useSelector((state) => state.authReducer.userData);
  const [wait, setWait] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleForm = async (data) => {
    setWait(true);
    const AvatarId = await blogger_service.uploadImage(data.avatarImage[0]);

    if (AvatarId) {
      await blogger_service
        .Create_Blogger({
          ...data,
          User_Account_ID: user.$id,
          Blogger_Avatar: AvatarId.$id,
        })
        .then((data) => {
          toast({ title: `Author ${data.Blogger_Name}` });
          setBlogger(data);
          navigate("/");
        })
        .catch((errors) => {
          setWait(false);
          alert(errors);
        });
    }
  };
  return (
    <>
      {user && (
        <>
          <form
            className="p-4 text-neutral-200 w-[90%] lg:w-[40%] mt-[6rem] shadow-xl bg-[#131313] shadow-black/30 mx-auto relative"
            onSubmit={handleSubmit(handleForm)}
          >
            <h2 className="text-left mb-8">Create Blogging Account</h2>
            {errors.Blogger_name && <p>{errors.Blogger_name.message}</p>}
            {errors.avatarImage && <p>{errors.avatarImage.message}</p>}

            <Input
              type="text"
              value={user.name}
              readOnly={true}
              {...register("username")}
            />

            <Input
              type="text"
              {...register("Blogger_Name", {
                required: "Blogger name required",
              })}
              placeholder="Blogger Account username"
            />
            <p className="text-left mb-3 mx-2">Choose Avatar Image</p>
            <Input
              type="file"
              {...register("avatarImage", {
                required: "Avatar Image Required",
              })}
            />
            <button
              type="submit"
              className="bg-sky-500 rounded-md p-2 hover:bg-sky-600 duration-200 mt-5 text-md w-full"
            >
              Create Account
            </button>
          </form>
          {wait && (
            <div className="lg:w-[41%] lg:h-[58%] top-[20%] lg:left-[30%] absolute bg-black/60 rounded-xl w-[90%] h-[75%] left-[5%]">
              <div className="w-full h-full absolute top-0 left-0">
                <p>Please wait your request is processing</p>
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-cyan-500 motion-reduce:animate-[spin_1.5s_linear_infinite] lg:mt-[35%] mt-[70%]"
                  role="status"
                ></div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Blogger_login;
