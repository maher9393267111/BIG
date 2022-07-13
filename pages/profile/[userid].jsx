import React from 'react';

import Moment from "react-moment";
import  Link from 'next/link';
import { useState,useEffect } from 'react';
import {Button, Popover} from '@chakra-ui/react'
import {
    useCollectionData,
    useDocumentData,
  } from "react-firebase-hooks/firestore";
  import { query, orderBy, collection, doc,getDoc,addDoc,serverTimestamp} from "firebase/firestore";
import safeJsonStringify from "safe-json-stringify";
//import Tab from '../../components/user/Tab';
import { db } from "../../firebase";
import NextHead from '../../components/global/NextHead';
import  Layout from '../../components/global/layout';
import { getAdditionalUserInfo } from 'firebase/auth';
import { useAuth } from '../../context/index';
import {useRouter} from 'next/router';

const Profile = ({user}) => {
  console.log('date------>',user.createdAt);

  const {userinfo, handleOnotherUser} = useAuth();
const currentDate = <Moment format="YYYY/MM/DD">{user.createdAt}</Moment>;
const router = useRouter();
const chatme = (
  <div>

    <p>Go to Chat</p>
   
  </div>
);


const newChat = async () => {




   const chat =  await  addDoc(collection(db, "chats"), {
      users: [userinfo.email, user.email],
      timestamp: serverTimestamp(),
    });

    // then redirect to created chat
    router.push(`/chat?chatid=${chat.id}`);
  
};







    return (
        <Layout>


<NextHead
        title="profile"
        metaDescription="user profile page here
        "
      />

<div className='mb-20 pb-20'>

<div>



{/* ----user  cover and his image section ----- */}

<div>

<div className='  bg-cover h-[350px] relative   '>

{/* -----user image--- */}

<div  className='absolute phone:bottom-[-50px] laptop:bottom-[-70px]  bg-slate-50 rounded-full ml-16'>

<img
className=' laptop:w-[9rem] laptop:h-[9rem] phone:h-[6rem] phone:w-[6rem]  rounded-full  hover:'
src={user?.image} alt="" />

</div>


</div>



{/* ----- follow bottn---- */}


<div className=' mt-6 mb-6 text-right mr-12  '>



<Button 
width={'136px'}
colorScheme='messenger'>Follow</Button>

{/* ---chat buton--- */}

{ userinfo.name !== undefined && userinfo.name !==user.name &&  


<div className=' text-right'>
<Popover placement="topRight"  content={chatme}>
  {/* <Link href={`/chat/${user?.id + userinfo?.id}`}> */}
  <p 
  onClick={newChat }
  className=' relative -top-6'>
    <img className='w-8 h-8 rounded-full mx-2 cursor-pointer' src="https://cdn3.iconfinder.com/data/icons/instagram-latest/1000/Instagram_send_message-256.png" alt="" />
  </p>
  {/* </Link> */}
</Popover>
</div>
}



</div>


{/* -----user inf---- */}


<div className='ml-8 mt-12'>

<div className=' '>
  <h1 className='text-xl font-semibold tg'>{user.name}</h1>

<h1 className='font-semibold text-xl my-2 tg'> {user.email}</h1>




<div className='pb-22 mt-2'>
  <h2 className=' tg font-semibold my-4'>  
    <img className="inline-block h-6 w-6 mr-2"
    src="https://cdn0.iconfinder.com/data/icons/basic-thin-ios/512/appointment_calendar_coming_soon_daily_date_datepicker_day_deadline_estimate_event_future_meeting_month_dates-256.png"
    alt="" />
 Joined At    {currentDate}
    
     </h2>


{/* ------followers  and following ---- */}

<div>

<div className='text-xl flex gap-12 tg font-semibold'>

<div>
  <p className=''>Following</p>
</div>


<div>
  <p>Followers</p>
</div>



</div>




</div>



</div>



</div>





</div>



</div>







</div>








</div>

           
            
        </Layout>
    );
}

export default Profile






export async function getServerSideProps(context) {
    const id = context.params.userid;
    console.log("id--->",id);
    const snapshot = await getDoc(doc(db, "users", id));
    
  
    const userdata = snapshot.data();
  

    if (!userdata) {
      return {
        notFound: true,
      };
    }
  
     userdata.id = snapshot.id;
  
  //  strignfy the data
    const user = JSON.parse(
      safeJsonStringify({ id: snapshot.id, ...snapshot.data() }) // needed for dates
    );


  

    return {
      props: { user},
    };
  }