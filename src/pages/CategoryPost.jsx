import Card from "@/components/Card";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "@/appwrite/config";

function CategoryPost() {
  const { category } = useParams();
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    service
      .getPostByCategory(category)
      .then((data) => {
        setPosts(data.documents);
      })
      .catch((error) => error);
  }, [category]);
  if (posts) {
    return (
      <>
        <div className="w-full p-4 mx-auto lg:w-[80%]">
          <p className="text-3xl text-neutral-300 text-left mb-3">
            You Searched "{category}"
          </p>
          <div className="w-full lg:gap-y-5 grid lg:grid-cols-4 lg:mx-auto md:grid-cols-2 md:gap-2 mx-auto gap-y-5 mt-4">
            {posts.map((post,index) => (
              <Card PostData={post} key={index} />
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <p>No POsts</p>
      </>
    );
  }
}

export default CategoryPost;
