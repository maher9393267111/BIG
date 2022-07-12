import React from 'react';
import { useRouter } from 'next/router';
import  Link from 'next/link';
import { useState,useEffect } from 'react';
import {Button} from '@chakra-ui/react'
import {
    useCollectionData,
    useDocumentData,
  } from "react-firebase-hooks/firestore";
  import { query, orderBy, collection, doc,getDoc} from "firebase/firestore";
import safeJsonStringify from "safe-json-stringify";
//import Tab from '../../components/user/Tab';
import { db } from "../../firebase";
import NextHead from '../../components/global/NextHead';
import  Layout from '../../components/global/layout';


const Profile = ({user}) => {
    return (
        <Layout>


<NextHead
        title="profile"
        metaDescription="user profile page here
        "
      />

<div>

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


<div className=' mt-6 mb-6 text-right mr-12'>
<Button 
width={'136px'}
colorScheme='messenger'>Follow</Button>
</div>


{/* -----user inf---- */}


<div className='ml-8 mt-12'>

<div>
  <h1 className='text-2xl font-bold'>{user.name}</h1>

<h1 className='font-bold text-2xl my-2'> {user.email}</h1>




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
