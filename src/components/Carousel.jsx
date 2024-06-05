import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import appwrite from "../appwrite/config";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useSelector } from "react-redux";

function Carousel({posts}) {
  // const [posts, setPosts] = useState(null);

  let images = useSelector((state) => state.authReducer.Pictures);

  // useEffect(() => {
  //   appwrite
  //     .getPosts([])
  //     .then((posts) => setPosts(posts))
  //     .catch((error) => console.log(error));
  // }, []);

  return (
    <div className="w-full md:h-[33rem] h-[20rem] mb-16">
      <h1 className="p-2 mb-4 text-left">Latest Articles </h1>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        grabCursor={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="myswiper w-full h-full duration-300"
      >
        {posts &&
          posts.map((post, index) => (
            <SwiperSlide key={index}>
              <Link to={`/`}>
                <img
                  src={appwrite.getFilePreview(post.Featured_Image)}
                  alt="slide_image"
                  className="w-full h-full object-cover object-center duration-200"
                />
                <div className="bg-black/45 w-full h-full absolute top-0 content-end md:p-8 p-2 pb-8">
                  <h1 className="text-left text-orange-400 md:mb-8 mb-2 text-lg lg:text-5xl">
                    {post.Title}
                  </h1>
                  <p className="text-justify text-gray-400 lg:w-[50%] w-full text-xs md:text-xl">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Tenetur quidem eligendi aspernatur eum rerum? Aliquam
                    perferendis, inventore nemo nostrum necessitatibus
                    praesentium iusto molestiae dolores vel, vitae animi tempore
                    illum voluptatem ratione velit voluptatibus fuga similique
                    maxime ut laudantium magnam quidem optio deserunt porro.
                    Voluptatum reprehenderit, voluptate corrupti aliquam debitis
                    id?
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default Carousel;
