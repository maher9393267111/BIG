import React from 'react';
import Navbar from './navbar';
const Layout = ({children}) => {
    return (
       <div>

{/* -----navbar--- */}
<div>
<Navbar />
</div>


{/* -----content---- */}
<div>
{children}
</div>



{/* footer if var--- */}


       </div>
    );
}

export default Layout;
