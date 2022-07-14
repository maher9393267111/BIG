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
>


<div className=' container mx-12'>


{/* ---flex followers and following--- */}
<div className=' flex gap-12'>

{/* ----followers--- */}

<div className=''>

<Link href={`/profile/followers?userid=${userid}`}>
<div className={`  `}>
    follower
</div>
</Link>



</div>


{/* ---following--- */}

<div className=''>

    <div className={`${pathname ='/profile/following'  ? '  bg-green-400' : ' '}   `}>
        following
    </div>

</div>

</div>










</div>






</UserLayout>
            
       
    );
}

export default Following;


