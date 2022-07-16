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
import {useRouter} from "next/router"
import {db} from '../firebase'


const Commentid = ({post,comment}) => {


const router = useRouter();


// find commnet id and postid from query
const commentid = router.query.commentid;   // ☑☑☑☑
const postid = router.query.postid;  // ☑☑☑☑




if (!commentid || !postid) {
  return <div>404</div>;
}







console.log("commentid--->", commentid, "postid--->", postid);

    return (
        <div>
          {post?.topic}
          {comment?.comment}
            
        </div>
    );
}

export default Commentid;






export async function getServerSideProps(context) {
    const id = context.query.postid;
    const comid = context.query.commentid;
    console.log("id--->", id);
    const snapshot = await getDoc(doc(db, "InstaPosts",id));
    const commentsnapshot = await getDoc(doc(db, "InstaPosts",id, "comments", comid));
  
    const userdata = snapshot.data();
    //console.log("userdata--->", userdata);

  
    if (!userdata) {
      return {
        notFound: true,
      };
    }
  
    userdata.id = snapshot.id;
  
    //  strignfy the data
    const post = JSON.parse(
      safeJsonStringify({ id: snapshot.id, ...snapshot.data() }) // needed for dates
    );
    
    const comment = JSON.parse(
      safeJsonStringify({ id: commentsnapshot.id, ...commentsnapshot.data() }) // needed for dates
    );
    



  
    return {
      props: { post, comment },
    };
  }
  