import React from 'react';
import VideoCard from './videoCard';
import Link from 'next/link';
const PostCart = ({post}) => {

    const {videos,topic,postedby,postedbyImage,caption,id,potedbyEmail} = post

    return (
        <div className='my-4 mx-4 pb-20'>

{/* -----if image show image else sitis video show video--- */}


{ post?.image?.image !== '' ? (
<div>



<div className='md:w-16 md:h-16 w-10 h-10'>
<Link href={`/profile/${potedbyEmail}`}>
  <>
    <img
      
      className=' rounded-full w-[66px] h-[66px]'
      src={postedbyImage}
      alt='user-profile'
     
    />
  </>
</Link>
</div>



            <div className='w-full phone:h-[355px] tablet:h-[422px] laptop:h-[500px]  relative'>
                <img className='w-full h-full cursor-pointer rounded-lg object-cover' src={post.image && post.image.image} alt="" />


{/* ---absolute topic show--- */}

<div className=' absolute'>

<p className='border-2 font-bold p-2 w-28 bg-blue-600  text-white rounded-full text-center '> {post?.topic}</p>


</div>

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
