import React from 'react';
import { useAuth } from '../../context';
import ChatsBar from './chatsBar';
import Sidebar from '../main/sidebar';
import Navbar from '../global/navbar';
import Nav2 from './nav2';
const UserLayout = ({children,userid,noNavbar=false,user}) => {
const {userinfo} = useAuth();



    return (
        <div className=' h-screen    overflow-y-scroll scrollbar-hide'>

        {/* -----navbar--- */}
        {!noNavbar && 
        <div>
        <Navbar />
        </div>
}
        
        
{/* --- followers and following pages navabr show only---- */}


{noNavbar && 
        <div>
        <Nav2  user={user} />
        </div>
}


        {/* -----content---- */}
        
        
        
        
        <div>
        
            {/* -----sidebar and children content grid---- */}
        
        <div className=' grid grid-cols-12 gap-8'>
        
        {/* ---sidebar--- */}
        
{/* -if auth usr his own proifle page show his chats e;se show suggested user to follow */}


 {userinfo?.email !== userid ?

(
        <div className={ ` ${noNavbar && 'mt-14 ml-12'}  phone:col-span-4  laptop:col-span-3`}>
            <Sidebar/>
        </div>
) : (

  
        <div className=' phone:col-span-4  laptop:col-span-3'>

<ChatsBar/>
            </div>
 
)      }  
        
        <div className={` ${noNavbar && 'mt-12'} phone:col-span-8  laptop:col-span-9`}>
            {children}
        </div>
        
        
        </div>
        
        
        
        </div>
        
        
        
        {/* footer if var--- */}
        
        
               </div>
    );
}

export default UserLayout;
