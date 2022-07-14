import React from 'react';

const Nav2 = ({user}) => {
    return (
       <div>

<div className='mb-12'>

{/* ---logo--- */}

<div className=' mt-8 flex justify-between phone:w-[60%] laptop:w-[50%] ml mr-12 my-6'>


{/* ---image-- */}

<div className='ml-12'>
    <img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" />
</div>


{/* ----go back button---- */}

<div>
   
<div className='flex '>

{/* ---go back icon show---- */}

<div>
    <div>
        <div>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"><g><path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path></g></svg>
        </div>
    </div>
</div>


{/* ----user data--- */}

<div>
    {user?.name}
</div>



</div>




</div>



</div>



</div>




       </div>
    );
}

export default Nav2;
