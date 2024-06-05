import React from "react";
import { Button } from "./ui/button";

function ListPost() {
  let me = [1, 2, 3, 4, 5, 6];
  return (
    <>
      <div className="w-full rounded-lg text-black flex mb-6">
        <p className="w-[4rem] bg-neutral-400 py-4 mx-2 rounded-lg">Sr.no</p>
        <div className="bg-neutral-400 grid grid-cols-5 w-full justify-items-center place-items-center py-5 rounded-lg">
          <p>Post Image</p>
          <p className="">Title</p>
          <p>Publish Date</p>
          <p>Category</p>
          <p>Option</p>
        </div>
      </div>

      {me.map((no) => (
        <div className="w-full rounded-lg text-white flex mb-3 bg-black/50 border border-neutral-500 hover:scale-105 duration-200" key={no}>
          <p className="w-[4rem] py-4 mx-2 rounded-lg my-auto">{no}</p>
          <div className=" grid grid-cols-5 w-full justify-items-center place-items-center py-2 rounded-lg">
            <img
              src="Images/Pic4.webp"
              alt="img"
              className="w-[5rem] h-[5rem] rounded-lg"
            />
            <p className=" w-full overflow-hidden truncate p-4">
              bhebfhbfhbfhjbhjrbhbhddbsfhdbfjhdbfjhdbfhjdbfjhbdfjbsdfjb
            </p>
            <p>12/05/2024</p>
            <p>Education</p>
            <Button variant="secondary">Delete</Button>
          </div>
        </div>
      ))}
    </>
  );
}

export default ListPost;
