import React from "react";

import Moment from "react-moment";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button, Popover } from "@chakra-ui/react";
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
import {useRouter} from "next/router";


const Commentid = () => {


const router = useRouter();

// find commnet id and postid from query
const commentid = router.query.commentid;
const postid = router.query.postid;

console.log("commentid--->", commentid);

    return (
        <div>
            
        </div>
    );
}

export default Commentid;






export async function getServerSideProps(context) {
    const id = context.params.commentid;
    console.log("id--->", id);
    const snapshot = await getDoc(doc(db, "", id));
  
    const userdata = snapshot.data();
    //console.log("userdata--->", userdata);
  
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
      props: { user },
    };
  }
  