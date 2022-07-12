import React from 'react';
import { useRouter } from 'next/router';
import  Link from 'next/link';
import { useState,useEffect } from 'react';
import {
    useCollectionData,
    useDocumentData,
  } from "react-firebase-hooks/firestore";
  import { query, orderBy, collection, doc,getDoc} from "firebase/firestore";
import safeJsonStringify from "safe-json-stringify";
//import Tab from '../../components/user/Tab';
import { db } from "../../firebase";




const Profile = ({user}) => {
    return (
        <div>

            <h1>{user.id}</h1>
            
        </div>
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
