import React from 'react';
import img1 from '../../assets/download.JPG'
export default function CommentPost({ comment }) {
    if (!comment) return null;
    let { content, _id, createdAt, post, commentCreator } = comment;


    return <>





      







        <div className='flex items-center     p-3  rounded-full '>




            <div>
                <img className='w-[40px] rounded-full ' src={commentCreator?.photo ? img1 : commentCreator?.photo} alt="" />
            </div>



            <div className='mx-2  bg-slate-100 hover:bg-slate-200  p-2 rounded-2xl'>
                <h2 className='  text-lg'> {commentCreator.name}</h2>
                <h3 className='text-sm'>{content}</h3>

            </div>


        </div>



    </>








}