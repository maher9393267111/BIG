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
     

<div>

{userid}

{followers?.length}

</div>
            
       
    );
}

export default Followers;



// export async function getServerSideProps(context) {
//     const id = context.params.userid;
//     console.log("id--->", id);
//     const snapshot = await getDoc(doc(db, "users", id));
  
//     const userdata = snapshot.data();
  
//     if (!userdata) {
//       return {
//         notFound: true,
//       };
//     }
  
//     userdata.id = snapshot.id;
  
//     //  strignfy the data
//     const user = JSON.parse(
//       safeJsonStringify({ id: snapshot.id, ...snapshot.data() }) // needed for dates
//     );

//     console.log("user👉️👉️👉️👉️👉️👉️👉️👉️--->", user);
  
//     return {
//       props: { user },
//     };
//   }
