import React from 'react';
import { useState, useEffect } from 'react';
import Moment from "react-moment";


const ListCommnets = ({comments}) => {
    return (
        <div>
            <div>
                

          <div>


{comments?.map((com) => (
    
<div key={com.id} className=' w-full h-[155px] py-2 border-b-2 border-b-[#536471]'>

<div>

{/* ---flex first---- */}

<div className='flex'>

{/* image and name and data--- */}

<div className='flex-1'>

<div className='flex gap-4 '>

{/* --image-- */}
<div>
    <img
    className='w-[58px] h-[58px] rounded-full object-cover'
    src={com?.userImg} alt="" />
</div>

{/* ---textand data-- */}
<div className='mt-4 font-semibold'>

{/* first---- */}
<div>
    <p className='laptop:text-md '> {com?.name}   <span className='   text-blue-500'> <Moment fromNow>{com?.timestamp?.toDate()}</Moment></span></p>
</div>


{/* second-- */}

<div className='my-2 '>
<div>
    <p>@{com?.replyto}</p>

<div className='text-xl my-2 font-md'>
    <p>{com?.comment}</p>
</div>


</div>


</div>



</div>



</div>



</div>


{/* icon--- */}
<div>
    share
</div>


</div>



</div>


</div>

))}



          </div>


            </div>
            
        </div>
    );
}

export default ListCommnets;
