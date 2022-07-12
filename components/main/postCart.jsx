import React from 'react';

const PostCart = ({post}) => {
    return (
        <div className='my-4 mx-4'>

{/* -----if image show image else sitis video show video--- */}


{ post?.image?.image !== '' ? (

            <div className='w-full h-[300px] relative'>
                <img className='w-full h-full cursor-pointer rounded-lg object-cover' src={post.image && post.image.image} alt="" />


{/* ---absolute topic show--- */}

<div className=' absolute'>

<p> {post?.topic}</p>


</div>

            </div>
) : 


// ----show video---
(

<div>
    itis video
</div>


)
}






            
        </div>
    );
}

export default PostCart;
