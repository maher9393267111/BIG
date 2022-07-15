import React from 'react';


const UsersFollowList = ({following,makeFollow,makeUnfollow,add=false,deleteme=false,authuser}) => {
    return (
       <div>
              <h1>

<div className=' flex gap-2 '>

<div className=' text-center my-4'>
    <img className='rounded-full  w-14 h-14 mr-4 inline-block w-full' src={following?.image} alt="" />


    <div>
        <p className='font-semibold text-md'>{following?.name}</p>
    </div>

<div>
</div>

{add ? 


(

    <div className='my-2'>

        <button
        disabled={authuser?.id === following?.id}
        className='bg-blue-500 inline-block w-[110px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => makeFollow(following)}>
           
            {authuser?.id === following?.id ? 'You' : 'Follow'} 
        </button>
       
    </div>
) :


(

<div className='my-2'>

    <button disabled={authuser?.id === following?.id}  className=  ' inline-block w-[110px]  bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => makeUnfollow(following)}>
    {authuser?.id === following?.id ? 'You' : 'Unfollow'} 
        
    </button>
  
</div>

)}


</div>



</div>


              </h1>
       </div>
    );
}

export default UsersFollowList;
