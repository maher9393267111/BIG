import React from 'react';

const UsersFollowList = ({following,makeFollow,makeUnfollow,add=false,deleteme=false}) => {
    return (
       <div>
              <h1>

<div className=' flex justify-between '>

    <div>
        <p>{following?.name}</p>
    </div>

<div>

{add ? 


(

    <div className='my-2'>

        <button className='bg-blue-500 inline-block w-[110px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => makeFollow(following)}>
            Follow
        </button>
       
    </div>
) :


(

<div className='my-2'>

    <button className=  ' inline-block w-[110px]  bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => makeUnfollow(following)}>
        Unfollow
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
