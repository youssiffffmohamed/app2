import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import ProfileUserPosts from "../ProfileUserPosts/ProfileUserPosts";
import PostCreator from "../../PostCreator/PostCreator";
export default function Profile() {


  // GET  logged User Data
  function getUserProfile() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["getUserProfile"],
    queryFn: getUserProfile,
    select: (data) => data?.data.user,
  });

  if (isLoading) {

    return <div className='flex justify-center h-52 my-50'> <div className="sk-folding-cube my-20">
      <div className="sk-cube1 sk-cube"></div>
      <div className="sk-cube2 sk-cube"></div>
      <div className="sk-cube4 sk-cube"></div>
      <div className="sk-cube3 sk-cube"></div>
    </div></div>

  }

  if (isError) {
    return <div className="text-center bg-amber-950 text-red-500 my-20 p-5">Error: {error.message}</div>;
  }


  //  Get single Post
  //   function getUserProfilePosts(){
  //     return axios.get(`https://linked-posts.routemisr.com/posts/664d5335f78bf5e43b651a23`,{
  //       headers:{
  //         token:localStorage.getItem("userToken")
  //       }

  //     })
  //   }

  //  let {data: postsData, isLoading, isError, error}=useQuery({

  //     queryKey:["getUserProfilePOsts"],
  //     queryFn:getUserProfilePosts,
  //  })









  return <>
<div >

   <div className="my-9">
     <PostCreator imgUser={data?.photo} nameUser={data?.name} />
   </div>


    <div className="container  mx-auto p-4 w-[80%]  rounded-2xl bg-red-400 text-white">
      <div className="flex  items-center  ">
        <div className="flex justify-center items-center m-auto">
          <div className="  ">
            <img className="w-[70px] rounded-full " src={data?.photo} alt="" />
          </div>
          <div className="  ">
            <h2 className="text-2xl">{data?.name}</h2>
            <h3 className="text-sm">{data?.email}</h3>
          </div>
        </div>

      </div>



      <div className=" my-10 w-[80%] mx-auto flex justify-between items-center">

        <h4>{data?.gender}</h4>
        <h6 className=' '>{new Date(data?.dateOfBirth).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',

        })}</h6>
      </div>


    </div>

    <ProfileUserPosts />








</div>
  </>
}
