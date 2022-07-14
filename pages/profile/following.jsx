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
const Following = ({}) => {

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
<div className=' flex laptop:justify-between mx-12 phone:w-[277px] laptop:w-[422px] font-semibold text-[#536471]'>

{/* ----followers--- */}

<div className='pfd'>

<Link href={`/profile/followers?userid=${userid}`}>
<div className={` w-full h-full cursor-pointer text hover:bg-[#EAF6F6] `}>

    <p className='pf'>followers</p>
</div>
</Link>



</div>


{/* ---following--- */}

<div className='pfd'>

    <div className={`${pathname ='/profile/following'  ? ' ' : ' '}    cursor-pointer  text-2xl hover:bg-[#EAF6F6] w-full h-full `}>
       
        <p className={`${pathname ='/profile/following'  ? 'hell ' : ' '} pf `}>following</p>
    </div>

</div>

</div>



{/* ----followersList show---- */}

<div className=' overflow-scroll scrollbar-hide h-[80vh] ml-12  phone:w-[277px] laptop:w-[422px] font-semibold text-[#536471]'>
   
<div>


{following?.length > 0 ? (
<div>


    {    following?.map((user) => {


return (

    <div key={user?.id}  className='my-12' >
      
<div className=' flex justify-between'>

{/* ---image and name and email---- */}


<div className='flex gap-6'>

{/* ---image-- */}
<div>
    <img className='w-20 h-20 rounded-full' src={user?.image} alt="userImage" />
</div>

{/* name and email */}

<div className=' font-semibold phone:text-sm  laptop:text-xl'>

<p> {user?.name}</p>

<p>{user?.email}</p>

</div>


</div>

{/* ----follow bitton---- */}

<div className=''>

folllow


</div>


</div>



    </div>
) })}
</div>) : (
<div>

<div>
    <h1 className='text-2xl my-12 text-center'>No Followers Yet</h1>
</div>


</div>

)}
</div>








</div>













</div>






</UserLayout>
            
       
    );
}

export default Following;


