import React, { useEffect, useState } from 'react';
import { PostsContext } from '../Register/PostsContext';
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import CommentPost from '../CommentPost/CommentPost';
import { Link } from 'react-router-dom';
import { BiSolidLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { RiShareLine } from "react-icons/ri";


function getAilPosts() {
    return axios.get('https://linked-posts.routemisr.com/posts?limit=50', {
        headers: {
            token: localStorage.getItem('userToken')
        }
    })

}



export default function Home() {







    let { data, isLoading, isError, error } = useQuery({
        queryKey: ['getAilPosts'],
        queryFn: getAilPosts,
        select: (data) => data?.data.posts
    })






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

    return <>
        <div className=' bg-slate-50   '>


            <h1 className='p-5 bg-amber-600 text-center rounded-2xl text-2xl'>youssif ferjani</h1>

                  
                    
                   
            <div className=' sm:w-full md:w-[50%]   mx-auto    '>
                {data.map((post) => <div key={post.id} className=' bg-white rounded-xl  shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.08)] my-3'>
                  
                    <Link to={`postdetails/${post.id}`}>
                        <div  >
                            <div className=' flex ms-1.5 '>

                                <div className='flex items-center gap-3  '>
                                    <div>   <img className=' size-[40px] rounded-full   ' src={post.user.photo} alt="" /></div>
                                    <div >
                                        <h6 className='text-gray-900 text-2xl '>{post.user.name}</h6>
                                        <h6 className='text-gray-900 text-2xs '>{new Date(post.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',

                                        })}</h6>
                                    </div>

                                </div>

                            </div>


                            <div className=' '>

                                <div><h2 className='my-2  w-[95%] ms-[2.5%]'>{post.body}</h2></div>

                                <div>   <img className='w-full' src={post.image} alt="" /></div>
                            </div>
                        </div>
                    </Link>




                    <div className=' '>

                        <div className='flex justify-between items-center w-[90%] ms-[5%] my-2  rounded-2xl   '>
                            <div className='flex justify-center items-center gap-2 cursor-pointer hover:bg-slate-300  p-2  rounded-2xl '>
                                <h3> Like</h3>
                                <BiSolidLike />

                            </div >



                            <div className='flex justify-center items-center gap-2 cursor-pointer hover:bg-slate-300  p-2  rounded-2xl '>
                                <h3> Comment</h3>
                                <FaComment />

                            </div>



                            <div className='flex justify-center  items-center gap-2 cursor-pointer hover:bg-slate-300  p-2  rounded-2xl '>
                                <h3> Share</h3>
                                < RiShareLine />

                            </div>


                        </div>

                    </div>




                    <div className=''>


                        <Link to={`postdetails/${post.id}`}>

                            <div className=' my-2  w-[95%] ms-[2.5%] cursor-pointer hover:text-blue-600 '>
                                <h3>Show more comments</h3>
                            </div>



                            <CommentPost comment={post?.comments[0]} />

                        </Link>
                    </div>




                </div>)}




            </div>




        </div>



    </>

}

