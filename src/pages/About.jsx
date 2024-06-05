import React from "react";
import { Button } from "@/components/ui/button";
function About() {
  return (
    <div className="font-sans leading-normal tracking-normal min-h-screen">
      <div className="container mx-auto px-4 h-screen flex items-center">
        <section className="bg-neutral-200 p-8 mt-10 shadow-lg rounded-lg">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-6 mx-auto">
            About Us
          </h1>
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <img
                className="rounded-lg shadow-md w-full h-auto"
                src="/Images/Pic5.webp"
                alt="About Us"
              />
            </div>
            <div className="w-full md:w-2/3 md:pl-10">
              <p className="text-gray-700 mb-4">
                Welcome to our blog! We are passionate about sharing insightful
                articles on a variety of topics, ranging from technology to
                lifestyle. Our team of experienced writers strives to provide
                high-quality content that is both informative and engaging.
              </p>
              <p className="text-gray-700 mb-4">
                Our mission is to inspire and educate our readers, helping them
                to stay informed about the latest trends and developments in
                their fields of interest. Whether you're here to learn something
                new or just to be entertained, we've got you covered.
              </p>
              <p className="text-gray-700 mb-4">
                Thank you for visiting our blog. We hope you enjoy reading our
                posts as much as we enjoy creating them. Feel free to explore,
                comment, and share our content. Your feedback and support mean
                the world to us.
              </p>
              <p className="text-gray-700">
                Stay tuned for more exciting content!
              </p>
            </div>
          </div>
          <Button>Click</Button>
        </section>
      </div>
    </div>
  );
}

export default About;
