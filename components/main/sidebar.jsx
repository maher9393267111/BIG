import React from 'react';
import Link from 'next/link';
import SuggestedAccounts from '../global/suggestedUsers';
const Sidebar = () => {
    return (
       <div className=' fixed '>
        <div>
            
{/* --------go home icon---- */}



<div>
<Link href='/main'>
    <h1 className='  ml-14 cursor-pointer'>
        <img
        className=' w-14 h-14 rounded-full inline-block'
        src="https://cdn1.iconfinder.com/data/icons/carbon-design-system-vol-4/32/home-256.png" alt="" />
        <span className='phone:hidden  laptop:inline-block font-bold text-red-600 mt-4 ml-2'>All Posts</span>
    </h1>
</Link>
</div>


<div>
    <SuggestedAccounts/>
</div>




        </div>
       </div>
    );
}

export default Sidebar;
