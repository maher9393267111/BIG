import React from 'react';
import VideoCard from './videoCard';
const PostCart = ({post}) => {
    return (
        <div className='my-4 mx-4 pb-20'>

{/* -----if image show image else sitis video show video--- */}


{ post?.image?.image !== '' ? (

            <div className='w-full phone:h-[355px] tablet:h-[422px] laptop:h-[500px]  relative'>
                <img className='w-full h-full cursor-pointer rounded-lg object-cover' src={post.image && post.image.image} alt="" />


{/* ---absolute topic show--- */}

<div className=' absolute'>

<p className='border-2 font-bold p-2 w-28 bg-blue-600  text-white rounded-full text-center '> {post?.topic}</p>


</div>

            </div>
) : 


// ----show video---
(

<div>
    <VideoCard post={post}/>
</div>


)
}






            
        </div>
    );
}

export default PostCart;
