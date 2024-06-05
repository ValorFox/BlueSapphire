import React from "react";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

function PostPage({PostData}) {
  return (
    <>
      {PostData && (
        <div className="text-justify">
          {PostData ? (
              <div className="">
                {parse(PostData.content)}
              </div>
          ) : (
            "No Post Data Check Post compnent"
          )}
        </div>
      )}
    </>
  );
}

export default PostPage;
