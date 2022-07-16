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
  getDocs,
  setDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import safeJsonStringify from "safe-json-stringify";
//import Tab from '../../components/user/Tab';
import { db } from "../../firebase";
import NextHead from "../../components/global/NextHead";
import Layout from "../../components/global/layout";
import { getAdditionalUserInfo } from "firebase/auth";
import { useAuth } from "../../context/index";
import { useRouter } from "next/router";
import { ExistChat, Follow, unfollow } from "../../utils/db";
import { message } from "antd";
import UserLayout from "../../components/user/userLayout";
import PostCart from "../../components/main/postCart";
import UseronotherPosts from "../../components/post/useronotherPosts";
import FunctionButtons from "../../components/post/functionButtons";
import { toast } from "react-toastify";
import { CgKey } from "react-icons/cg";
import CommentInput from "../../components/post/Input";

const Postid = ({ post }) => {
  const { userinfo, handleOnotherUser } = useAuth();

  const [refresh, setRefresh] = useState(false);

  const q2 = query(collection(db, "InstaPosts", post?.id, "comments"));
  const [comments] = useCollectionData(q2);
  //  console.log("comments---->>> is➿➿➿",comments);

  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  const fetchlikes = async () => {
    const userin = await getDocs(
      collection(db, "InstaPosts", post?.id, "likes")
    );

    const allLikes = [];

    userin.forEach((doc) => allLikes.push({ ...doc.data(), id: doc.id }));
    console.log("🔥🔥🔥", allLikes);
    setLikes(allLikes);
    //  return allPosts;
  };

  useEffect(() => {
    fetchlikes();
  }, [post?.id, db, refresh]);

  useEffect(() => {
    // ---->>> importnat to work good
    setHasLiked(likes?.findIndex((like) => like.id === userinfo.id) !== -1);
    console.log("has liked---->", hasLiked);
  }, [likes, refresh]);

  const likedPost = async () => {
    try {
      if (userinfo.name) {
        if (hasLiked) {
          setRefresh(!refresh);
          console.log(post.id, "___Delete Like____");
          // delete doc from likes if aleready liked
          await deleteDoc(doc(db, "InstaPosts", post.id, "likes", userinfo.id));
          message.success(`Unliked`);
        } else {
          setRefresh(!refresh);

          console.log(post.id, "___add Like___");
          // add doc to likes if not already liked
          await setDoc(doc(db, "InstaPosts", post.id, "likes", userinfo.id), {
            username: userinfo.name,
          });
          //  message.success("Liked",hasLiked);
        }
      } else {
        // message.error("Please login to like");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <UserLayout userid={post?.postedbyId}>
      {/* --grid post card and onother this post user posts--show---- */}

      <div className=" grid grid-cols-12  pb-24">
        <div className="phone:col-span-12 laptop:col-span-6  mr-8">
          <PostCart cathide={true} post={post} />

          {/* ----post likes an coments---- and create ----- */}

          {/* ----likes and coments length--- */}

          <div className=" phone:ml-20 laptop:ml-24   ">
            <div className="flex gap-12 font-semibold text-lg">
              <div className=" hover:underline cursor-pointer tg">
                <p>{likes?.length} likes</p>
              </div>

              <div className=" hover:underline  cursor-pointer tg">
                <p>{comments?.length} comments</p>
              </div>
            </div>

            {/* -----function buttons--- */}

            <div className="   my-6">
              <FunctionButtons
               hasLiked={hasLiked}
               
                likedPost={likedPost}
              />
            </div>

{/* ------wrappers----- */}
            <div className="wrapper ">
            
<div>
    <CommentInput postedbyId ={post?.postedbyId} postedby={post?.postedby} 
    postedbyImage={post?.postedbyImage} postid={post?.id} 
    
    userinfo={userinfo}  />
</div>



            </div>
          </div>
        </div>

        <div className=" phone:hidden laptop:block laptop:col-span-6">
          <UseronotherPosts userid={post?.postedbyId} postid={post?.id} />

          <div></div>
        </div>
      </div>
    </UserLayout>
  );
};

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
