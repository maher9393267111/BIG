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
//import Tab from '../../components/user/Tab';
import { db } from "../../firebase";
import NextHead from "../../components/global/NextHead";
import Layout from "../../components/global/layout";
import { getAdditionalUserInfo } from "firebase/auth";
import { useAuth } from "../../context/index";
import { useRouter } from "next/router";
import { ExistChat,Follow,unfollow , } from "../../utils/db";
import { message } from "antd";
import UserLayout from "../../components/user/userLayout";
import PostCart from "../../components/main/postCart";
import UseronotherPosts from "../../components/post/useronotherPosts";

const Postid = ({post}) => {

    const { userinfo, handleOnotherUser } = useAuth();

    const q = query(
        collection(db, "InstaPosts", post?.id, "likes"),

      );
      const [likes, loading] = useCollectionData(q);
    console.log("likes---->🛹🛹🛹",likes);


    const q2 = query(
      collection(db, "InstaPosts", post?.id, "comments"),

    );
    const [comments] = useCollectionData(q2);
    console.log("comments---->>> is➿➿➿",comments);







    return (

        <UserLayout

        userid ={post?.postedbyId}
           >

{/* --grid post card and onother this post user posts--show---- */}

<div className=" grid grid-cols-12">



<div className="phone:col-span-12 laptop:col-span-6  mr-8">
    <PostCart cathide={true} post={post}/>

{/* ----post likes an coments---- and create ----- */}

{/* ----likes and coments length--- */}

<div className=" phone:ml-12 laptop:ml-24 ">

<div className="flex gap-12 font-semibold text-md">

<div className=" hover:underline cursor-pointer tg">
    <p>{likes?.length} likes</p>
</div>


<div className=" hover:underline  cursor-pointer tg">
    <p>
       {comments?.length} comments
    </p>
</div>


</div>


</div>


</div>


<div className=" phone:hidden laptop:block laptop:col-span-6">

<UseronotherPosts   userid ={post?.postedbyId} postid={post?.id} />

<div>








</div>



</div>





</div>



            </UserLayout>
    );
}

export default Postid;



export async function getServerSideProps(context) {
    const id = context.params.postid;
    console.log("id--->", id);
    const snapshot = await getDoc(doc(db, "InstaPosts", id));

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


    return {
      props: { post },
    };
  }

