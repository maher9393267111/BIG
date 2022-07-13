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

<div className=' col-span-3'>
    <Sidebar/>
</div>


<div className=' col-span-9'>
    {children}
</div>


</div>



</div>



{/* footer if var--- */}


       </div>
    );
}

export default Layout;
