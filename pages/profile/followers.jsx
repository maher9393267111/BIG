import React from 'react';
import { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import UserLayout from "../../components/user/userLayout";
import { useAuth } from "../../context/index";
import {
    useCollectionData,
    useDocumentData,
  } from "react-firebase-hooks/firestore";
  import {
    query,
    orderBy,
    collection,
    doc,
    getDoc,
    addDoc,
    serverTimestamp,
  } from "firebase/firestore";
  import safeJsonStringify from "safe-json-stringify";
  //import Tab from '../../components/user/Tab';
  import { db } from "../../firebase";
  import NextHead from "../../components/global/NextHead";
const Followers = ({}) => {

    const router = useRouter();
    const { userid } = router.query;

    // find pathname
    const pathname = router.pathname;
    console.log("pathname--->",pathname);
 
console.log("user💡💡💡💡",userid);


const q = query(
    collection(db, "users", userid, "followers"),
    
  );
  const [followers, loading] = useCollectionData(q);
console.log("followers🛹🛹🛹",followers);


const q2 = query(
  collection(db, "users", userid, "following"),
  
);
const [following] = useCollectionData(q2);
console.log("following is➿➿➿",following);



    return (
     

<UserLayout
userid={userid}
noNavbar={true}
>


<div className=' container mx-12'>


{/* ---flex followers and following--- */}
<div className=' flex justify-between mx-12 phone:[230px] laptop:w-[422px] font-semibold text-[#536471]'>

{/* ----followers--- */}

<div className='pfd '>

<div className={`${pathname ='/profile/followers'  ? ' ' : ' '}  text  cursor-pointer w-full h-full   hover:bg-[#EAF6F6] `}>
    <p className={`${pathname ='/profile/followers'  ? 'hell ' : ' '} pf `}>  follower</p>
  
</div>



</div>


{/* ---following--- */}

<div className='pfd'>
<Link href={`/profile/following?userid=${userid}`}>
    <div className={` cursor-pointer text hover:bg-[#EAF6F6] w-full h-full `}>
       
        <p className='pf'> following </p>
    </div>
</Link>

</div>

</div>



{/* ----followersList show---- */}

<div className=' overflow-scroll scrollbar-hide h-[80vh]  phone:[240px] laptop:w-[422px] font-semibold text-[#536471]'>
   
<div>


{followers?.length > 0 ? (
<div>


    {    followers?.map((user) => {


return (

    <div>
        <h1>{user?.name}</h1>

    </div>
) })}
</div>) : (
<div>

<div>
    <h1 className='  text-2xl my-12 text-center'>No Followers Yet</h1>
</div>


</div>

)}
</div>








</div>









</div>






</UserLayout>
            
       
    );
}

export default Followers;


