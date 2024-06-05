import React, { useState } from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/config";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";

function Card({ PostData, button = false, status = false }) {
  const { toast } = useToast();
  const deletePost = async (BlogID) => {
    service.deletePost(BlogID).then(() =>
      toast({
        title: "Arctile is Removed",
        description: PostData.Title,
        swipeDirection:"left",
      })
    );
  };

  return (
    <>
      <div className="lg:w-[95%] overflow-hidden duration-200 shadow-2xl shadow-black/90 w-[90%] rounded-xl relative mx-auto lg:mx-0 text-justify">
        <Link to={`/post/${PostData.$id}`}>
          <div className="w-full overflow-hidden relative">
            <img
              src={service.getFilePreview(PostData.Featured_Image)}
              alt="img"
              className="h-[16rem] object-cover w-full object-center"
            />
            <p className="absolute w-full top-0 flex items-end p-4 opacity-100 duration-150 hover:backdrop-blur-sm hover:bg-black/55 bottom-0 bg-gradient-to-t from-[#000000cd] to-transparent from-8% overflow-hidden text-neutral-300">
              {PostData.Title}
            </p>
          </div>
        </Link>
        <div className="w-full flex p-2 justify-between text-neutral-300">
          <div>
            <img
              src={
                PostData.AvatarId
                  ? service.getBloggerAvatar(PostData.AvatarId)
                  : "public/Images/Pic2.webp"
              }
              alt="img"
              className="w-[30px] h-[30px] inline rounded-[100%] object-cover object-center"
            />
            <p className="inline ml-3 ">{PostData.Blogger_Name}</p>
          </div>
        </div>
        <div className="flex justify-between px-2 my-2">
          <p className="px-3 border border-neutral-400 rounded p-1 w-max">
            {PostData.Category}
          </p>
          {status && (
            <p className="px-3 border border-neutral-400 rounded p-1">
              {PostData.Status}
            </p>
          )}
        </div>
        {button && (
          <div className="p-2">
            <Button variant="outline" onClick={() => deletePost(PostData.$id)}>
              remove
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default Card;
