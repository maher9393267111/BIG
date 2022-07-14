import React from 'react';
import Link from 'next/link';
const Nav2 = ({user}) => {


//console.log("NAV2💡-------------💡💡💡",user);

    return (
       <div>

<div className='mb-12'>

{/* ---logo--- */}

<div className=' mt-8 flex justify-between phone:w-[80%] tablet:w-[68%] laptop:w-[50%] ml mr-12 my-6'>


{/* ---image-- */}

<Link href='/main'>
<div className='ml-12'>
    <img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" />
</div>
</Link>


{/* ----go back button---- */}

<div>
   
<div className='flex '>

{/* ---go back icon show---- */}

<div>
    <div>
        <div>
        <img className='w-10 h-10 rounded-full' src="https://cdn4.iconfinder.com/data/icons/navigation-40/24/back-1-256.png" alt="" />
        </div>
    </div>
</div>


{/* ----user data--- */}

<div className='ml-12'>
    <p className='text-2xl font-semibold'> {user?.name}</p>
   
</div>



</div>




</div>



</div>



</div>




       </div>
    );
}

export default Nav2;
