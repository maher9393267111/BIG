import React from 'react';
import {useRouter} from 'next/router';
import PostCart from './postCart';
const Posts = ({posts}) => {
    return (
        <div>
            <div>
             
<div className=''>


{/* ---grid of posts--- */}


<div className='w-full grid laptop:grid-cols-3 phone:grid-cols-2'>


{posts.map((post) => (

<div key ={post.id} className =' '>
    <PostCart post={post}/>
</div>

))}

</div>


</div>



            </div>
        </div>
    );
}

export default Posts;
