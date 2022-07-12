import React from 'react';
import {useRouter} from 'next/router';
import PostCart from './postCart';
const Posts = ({posts}) => {
    return (
        <div>
            <div>
             
<div className=''>


{/* ---grid of posts--- */}


<div className='w-full'>


{ posts.length > 0  ? 
(
 posts.map((post) => (

<div key ={post.id} className =' '>
    <PostCart post={post}/>
</div>

))

 )

 : (

    <div>
        <p className=' text-red-500 text-2xl fond-bold text-center my-12'>no posts found</p>
    </div>
 )
 
 }
 

</div>


</div>



            </div>
        </div>
    );
}

export default Posts;
