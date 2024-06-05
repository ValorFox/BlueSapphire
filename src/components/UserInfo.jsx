import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../appwrite/config";
import Card from "./Card";
import { Link } from "react-router-dom";
import ListPost from "./ListPost";

function UserInfo() {
  const BloggerData = useSelector((state) => state.blogReducer);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    if (BloggerData.BlogStatus) {
      service.getAuthorPosts(BloggerData.Blogger.$id).then((data) => {
        setPosts(data.documents);
        if (data.documents.length == 0) {
          setPosts(null);
        }
      });
    }
  }, [BloggerData]);
  return (
    <>
      {BloggerData.BlogStatus && (
        <>
          <p className="text-5xl text-neutral-400 mt-2">Author Dashboard</p>
          <div className=" lg:w-[80%] lg:h-[80%] flex p-6 w-[90%] mx-auto bg-black/50 rounded-lg lg:ml-[9.5rem] mt-8 border border-neutral-600">
            <img
              src={service.getBloggerAvatar(BloggerData.Blogger.Blogger_Avatar)}
              alt="author avatar"
              className="w-[7rem] h-[7rem] rounded-full object-cover object-center"
            />
            <p className=" w-full py-2 text-neutral-400 mt-6 ml-5 text-2xl text-right ">
              Author : {BloggerData.Blogger.Blogger_Name}
            </p>
           
          </div>
          <p className="lg:w-[80%] mx-auto text-left lg:text-6xl text-neutral-400 mt-8 px-3 lg:p-0 text-5xl">
            Your Posts
          </p>
          <div className="lg:w-[80%] w-full mt-[2rem] lg:mt-[4rem] lg:gap-y-5 grid lg:grid-cols-4 lg:mx-auto md:grid-cols-2 md:gap-2 mx-auto gap-y-6">
            {posts &&
              posts.map((post, index) => (
                <Card PostData={post} key={index} button={true} status={true} />
              ))}
          </div>
          {/* <div className="w-[85%] mx-auto p-4">
            <ListPost/>
          </div> */}
          {!posts && (
            <div className="w-[80%] p-4 mx-auto flex flex-col">
              <p className="text-2xl text-neutral-400">
                Publish your First Article
              </p>
              <Link to={"/addpost"}>
                <button className="px-3 py-2 bg-black/90 rounded-md border-neutral-400 border  text-neutral-300 hover:bg-black/5 duration-200 w-[15%] mx-auto mt-5">
                  Create
                </button>
              </Link>
            </div>
            
          )}
        </>
      )}
    </>
  );
}

export default UserInfo;
