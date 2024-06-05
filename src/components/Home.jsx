import React, { useCallback, useEffect, useState } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "./Carousel";
import "../Font.css";
import service from "../appwrite/config";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service
      .getPosts()
      .then((posts) => setPosts(posts.documents))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div className="lg:px-[2rem] p-1 md:w-full md:flex md:flex-wrap w-full relative dark">
        <Carousel posts={posts} />
        <div className="lg:w-[95%] w-full mt-[7rem] lg:gap-y-5 grid lg:grid-cols-4 lg:mx-auto md:grid-cols-2 md:gap-2 mx-auto gap-y-5">
          {posts &&
            posts.map((post, index) => <Card PostData={post} key={index} />)}
        </div>
      </div>
    </>
  );
}

export default Home;
