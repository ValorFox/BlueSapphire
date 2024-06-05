import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Input, RTE } from "../Index";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BloggerService, { bloggerService } from "../../appwrite/Blog_Account";
import { useToast } from "../ui/use-toast";

function PostForm() {
  const StatusOption = ["active", "inactive"];
  const [wait, setWait] = useState(false);
  const { register, handleSubmit, control, setValue, watch } = useForm();
  const Blogger = useSelector((state) => state.blogReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  async function fromHandle(data) {
    const Blogger_ID = Blogger.Blogger.$id;
    const Blogger_Name = Blogger.Blogger.Blogger_Name;
    const AvatarId = Blogger.Blogger.Blogger_Avatar;

    try {
      setWait(true);
      let Image = data.article_image[0];
      let Featured_Image = await BloggerService.uploadArticleImage(Image);
      if (Featured_Image) {
        await BloggerService.UploadPost({
          ...data,
          Featured_Image: Featured_Image.$id,
          Blogger_ID,
          Blogger_Name,
          AvatarId,
        })
          .then(() => {
            toast({
              title: "Your post is published successfully",
            });
            setWait(false);
            navigate("/");
          })
          .catch((error) => {
            setWait(false);
            console.log(error);
          });
      }
    } catch (error) {
      setWait(false);
      alert(error);
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      const slug = value.toLowerCase().replace(/ /g, "-");
      setValue("slug", slug);
      return slug;
    }
  }, []);

  useEffect(() => {
    setValue("date", date);
    const subscription = watch((value, { name }) => {
      if (name === "Title") {
        setValue("slug", slugTransform(value.Title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const date = useMemo(() => {
    const date = new Date();
    return date.toLocaleDateString();
  }, []);

  return (
    <>
      <div className="relative">
        <form
          className="lg:p-5 p-2 lg:px-16"
          onSubmit={handleSubmit(fromHandle)}
        >
          <div className="lg:w-[70%] mx-auto p-2 mb-7 mt-8">
            <Input
              type="text"
              classname="lg:w-[45%] lg:mx-3 w-[80%]"
              placeholder="title"
              {...register("Title", { required: true })}
            />
            <Input
              type="text"
              readOnly={true}
              classname="lg:w-[45%] lg:mx-3 w-[80%]"
              placeholder="slug (auto-generated)"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
            {Blogger.Options && (
              <div className="lg:w-[95%] w-full grid lg:grid-cols-2 grid-cols-1 mb-4 items-center">
                <Select
                  required={true}
                  onValueChange={(value) => setValue("Category", value)}
                >
                  <SelectTrigger className="lg:w-[95%] w-full lg:ml-9 bg-[#1e1e1e] mb-4 lg:mb-0">
                    <SelectValue placeholder="Select Post Category " />
                  </SelectTrigger>
                  <SelectContent className="bg-black/50">
                    <SelectGroup className="bg-black/70">
                      {Blogger.Options.map((option, index) => (
                        <SelectItem value={option} key={index}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectSeparator />
                    <SelectItem value="Other" className="bg-black/70">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  required={true}
                  onValueChange={(value) => setValue("Status", value)}
                >
                  <SelectTrigger className="lg:w-[94%] w-full  lg:ml-9 bg-[#1e1e1e]">
                    <SelectValue placeholder="Select Post Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/50">
                    <SelectGroup className="bg-black/50">
                      {StatusOption.map((option, index) => (
                        <SelectItem value={option} key={index}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
            <Input
              type="file"
              classname="lg:w-[45%] w-[80%]"
              {...register("article_image")}
            />
            <Input
              classname="text-white lg:w-[45%] lg:mx-3 w-[80%]"
              type="text"
              placeholder="Publishing Date"
              readOnly={true}
              {...register("date")}
            />
            <button
              className="w-[95%] bg-sky-500 py-3 rounded-md hover:bg-sky-700 lg:w-[92%] text-black"
              type="submit"
            >
              Publish
            </button>
          </div>
          <RTE control={control} />
        </form>

        {wait && (
          <div className="absolute w-full h-full  bg-black/60 top-0 z-50 backdrop-blur-md">
            <p className="mt-[10rem] text-2xl">Your Post is under process</p>
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-cyan-500 motion-reduce:animate-[spin_1.5s_linear_infinite] mt-[10%]"
              role="status"
            ></div>
          </div>
        )}
      </div>
    </>
  );
}

export default PostForm;
