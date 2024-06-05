import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import config from "../appwrite/config.js";
import Post from "./Post";
import { split } from "postcss/lib/list";
import { comment } from "postcss";

function ReadPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  let Postdate = null;

  const [comments, setComments] = useState([
    ["lorem12"],
    ["Lorem ipsum dolor sit amet consectetur adipisicing elit."],
    ["Lorem ipsum dolor sit amet consectetur adipisicing elit."],
    ["Lorem ipsum dolor sit amet  elit."],
    ["Lorem ipsum dolor sit amet consectetur adipisicing elit."],
    ["Lorem ipsum dolor sit amet consectetur elit."],
  ]);

  useEffect(() => {
    config
      .getPost(slug)
      .then((postdata) => setPost(postdata))
      .catch((error) => console.log(error));
  }, [slug]);

  if (post) {
    const newString = split(post.$createdAt, "T");
    Postdate = newString[0];
  }
  return (
    <>
      {post ? (
        <div
          className="w-full p-4 lg:p-8 lg:px-24 flex flex-col"
          style={{ fontFamily: "static/JosefinSlab-Light" }}
        >
          <h1 className="mb-12 text-justify lg:text-5xl lg:px-4 text-4xl tracking-tighter">
            {post.Title}
          </h1>
          <div className="w-full md:h-[30rem] h-[15rem] overflow-hidden rounded-lg mb-8">
            <img
              className="w-full h-full object-cover object-center"
              src={post ? config.getFilePreview(post.Featured_Image) : null}
              alt="Food Image"
            />
          </div>

          <div className="flex item-center justify-between">
            <p className="text-left my-3">
              Published On : {Postdate ? Postdate : ""}
            </p>
            <p className="text-left my-3">Author : {post.Blogger_Name}</p>
          </div>
          <Post PostData={post} />
          <div className="w-full text-left mt-3">
            <div>
            <input
              type="text"
              placeholder="Post Comment"
              className="lg:w-[90%] rounded-lg border bg-[#2E2E2E] px-4 py-3 outline-none mt-8 w-[65%]"
            />
            <button type="submit" className="px-3 py-3 bg-black/90 rounded-md border-neutral-400 border  text-neutral-300 hover:bg-black/5 duration-200 ml-4">Comment</button>
            </div>
            <p className="text-2xl text-gray-300 mb-4 my-2">
              Comments 
            </p>
            <div className="w-full flex flex-wrap justify-start gap-4">
              {comments.map((value, index) => (
                <div
                  className="md:w-[30%] bg-white/10 p-3 rounded-3xl flex gap-2"
                  key={index}
                >
                  <img
                    src={"/Images/Pic8.webp"}
                    alt="Profile Picture"
                    className="w-10 h-10 object-cover object-center rounded-full bg-orange-400 inline"
                  />
                  <div className="flex-grow mr-4 ">
                    <span>anonymous</span>
                    <p className="text-justify">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ReadPost;
