import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import CommentPost from "../CommentPost/CommentPost";
import { BiSolidLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { RiShareLine } from "react-icons/ri";

export default function PostDetails() {
  let { id } = useParams();
  console.log(id);

  function getSinglePost() {
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["getSinglePost"],
    queryFn: getSinglePost,
    select: (data) => data?.data.post,
  });
  console.log(data);

  if (isLoading) {
    return (
      <div className="flex justify-center h-52 my-50">
        {" "}
        <div className="sk-folding-cube my-20">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center bg-amber-950 text-red-500 my-20 p-5">
        Error: {error.message}
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="flex gap-3 sm:w-full md:w-[50%] my-2   mx-auto   ">
          <div className="flex justify-center items-center gap-3 ">
            <div>
              {" "}
              <img
                className=" size-[40px] rounded-full "
                src={data?.user.photo}
                alt=""
              />
            </div>
            <div>
              <h6 className="text-gray-900 text-lg ">{data?.user.name}</h6>
              <h6 className="text-gray-900 text-2xs ">
                {new Date(data?.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h6>
            </div>
          </div>
        </div>

        <div className=" sm:w-full md:w-[50%]    mx-auto  ">
          <div>
            <h2 className="my-3">{data?.body}</h2>
          </div>

          <div>
            {" "}
            <img className="full" src={data?.image} alt="" />
          </div>

          <div className="flex justify-between items-center border-2 border-b-amber-700   rounded-2xl p-2 my-3  ">
            <div className="flex justify-center items-center gap-2 cursor-pointer hover:bg-slate-300  p-3 bg-slate-100 rounded-2xl ">
              <h3> Like</h3>
              <BiSolidLike />
            </div>
            <div className="flex justify-center items-center gap-2 cursor-pointer hover:bg-slate-300  p-3 bg-slate-100 rounded-2xl ">
              <h3> Comment</h3>
              <FaComment />
            </div>
            <div className="flex justify-center  items-center gap-2 cursor-pointer hover:bg-slate-300  p-3 bg-slate-100 rounded-2xl ">
              <h3> Share</h3>
              <RiShareLine />
            </div>
          </div>

          {data?.comments.map((comment) => (
            <CommentPost comment={comment} key={comment._id} />
          ))}
        </div>
      </div>
    </>
  );
}
