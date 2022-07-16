import React from 'react';
import {useState,useEffect} from 'react';
import { UserOnotherPosts} from '../../utils/db';
import Link from 'next/link';
const UseronotherPosts = ({userid, postid}) => {

const [posts, setPosts] = useState([]);

useEffect(() => {

UserOnotherPosts(userid, postid).then((data) => {

    setPosts(data);
    console.log("data--->👉️👉️👉️👉️👉️👉️", data);
})

}, [postid]);





    return (
       <div>

{posts?.length > 0 ? (

<div className=''>

<div>


<div>
    <h1 className=' text-center text-xl font-semibold my-6  hover:text-blue-500 duration-300 transition-all'>Onother Posts to See</h1>
</div>


<div className=' grid grid-cols-2 gap-6 mr-12'>

    {posts.map((post) => (
<div key={post?.id}>
<div className='flex flex-col'>

{post?.image?.image  ? (<div>

<div className=' h-[155px]'>
    <Link href={`/post/${post?.id}`}>
    <img className=' cursor-pointer object-contain w-full h-full rounded-md' src={post?.image?.image} alt="" />
    </Link>
</div>


</div>)

: (
<div>

<div>
    <Link href={`/post/${post?.id}`}>
    <video src={post?.videos?.video} className='w-full h-full' controls/>
    </Link>
</div>


</div>

)


}




    </div>
</div>


    ))}


</div>


</div>


</div>

) 

: 
(
    <div>



<div>

    <h1>No onother Posts to Show</h1>

</div>


    </div>
)

}



       </div>
    );
}

export default UseronotherPosts;
