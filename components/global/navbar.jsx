import React from 'react';
import Link from 'next/link';
import { Button, Popover } from 'antd';
import {useAuth} from '../../context/index';
const Navbar = () => {

const {userinfo,logout,showModal} = useAuth();


const content = (
    <div>
      <p>your chats</p>
     
    </div>
  );

  const post = (
    <div>
      <p>Create Post</p>
     
    </div>
  );




    return (
        <div className='mb-12'>
        
<div>

<div className=' mt-12 flex justify-between mx-16'>


{/* ------instagram logo ----- */}


<div>

<Link href='/main'><div>
    <img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" />
</div>

</Link>


</div>



{/* -----left side of navbar----- */}


{/* ----if user is auth---- */}

{ userinfo?.name ?  (


<div className=' mr-12'>

<div>


{/* ---user image--- */}

<div className=' flex gap-4'>
<img
 className='w-14 h-14'
src={userinfo?.image} alt="" />



{/* ----- chat icon ----- */}




<Popover placement="topRight"  content={content}>
        {/* <Button> */}
             <img className='w-12 h-12 rounded-full' src="https://cdn2.iconfinder.com/data/icons/buno-ui-interface/32/__chat_messagem_bubble-256.png" alt="" />
        
        {/* </Button> */}
      </Popover>



{/* ----logout button-----  */}

<div
onClick={logout}

>
    <img
    className='w-12 h-12 rounded-full'
    src="https://cdn4.iconfinder.com/data/icons/navigation-40/24/exit-256.png" alt="" />
</div>


<div>
<Popover placement="topRight"  content={post}>

    <img
    onClick={showModal}
      className='w-12 h-12 rounded-full'
    src="https://cdn3.iconfinder.com/data/icons/social-media-2487/24/new_post-128.png" alt="" />
    </Popover>
    
</div>




</div>





</div>





</div>

)


:  (


<div>

<div className=' flex gap-6'>

<div>
    <Link href='/auth/login'><Button
bgColor ='#3182ce'

colorScheme='linkedin'>Login</Button>
</Link>
</div>


<div>
<Link href='/'>
<Button 
bgColor ='#3182ce'

colorScheme='linkedin'>Register</Button>
</Link>
</div>




</div>





</div>

) 
}









{/* ----if user is not auth---- */}












</div>





</div>



        </div>
    );
}

export default Navbar;
