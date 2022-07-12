


import { useRouter } from 'next/router';
import Moment from "react-moment";
import  Link from 'next/link';
import { useState,useEffect } from 'react';
import {Button, Popover} from '@chakra-ui/react'
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


const Chatid = ({chatwith}) => {
    return (
       <div>
              {chatwith?.name}
       </div>
    );
}

export default Chatid;






export async function getServerSideProps(context) {
    const id = context.params.chatid;
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
    const chatwith = JSON.parse(
      safeJsonStringify({ id: snapshot.id, ...snapshot.data() }) // needed for dates
    );


  

    return {
      props: { chatwith},
    };
  }
