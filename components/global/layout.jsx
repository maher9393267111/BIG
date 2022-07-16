import React from 'react';
import Sidebar from '../main/sidebar';
import Navbar from './navbar';
const Layout = ({children}) => {
    return (
       <div className=' h-screen    overflow-y-scroll scrollbar-hide'>

{/* -----navbar--- */}
<div>
<Navbar />
</div>


{/* -----content---- */}




<div>

    {/* -----sidebar and children content grid---- */}

<div className=' grid grid-cols-12 gap-8'>

{/* ---sidebar--- */}

<div className='phone:hidden  laptop:block  laptop:col-span-3'>
    <Sidebar/>
</div>


<div className=' laptop:ml-2 laptop:mr-2  phone:ml-14 phone:mr-12 phone:col-span-12  laptop:col-span-9'>
    {children}
</div>


</div>



</div>



{/* footer if var--- */}


       </div>
    );
}

export default Layout;
