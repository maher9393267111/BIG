import React from "react";

import Moment from "react-moment";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button, Popover } from "@chakra-ui/react";
import {
  useCollectionData,
  useDocumentData,
  useCollection,
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
import { useRouter } from "next/router";
import { db } from "../firebase";
import { useAuth } from "../context";
import UserLayout from "../components/user/userLayout";
import { BsArrowLeft } from "react-icons/bs";
import PostCard from '../components/main/postCart';

const Commentid = ({ post, comment }) => {
  const router = useRouter();
  const { userinfo } = useAuth();


  const [snapshot] = useCollection(collection(db, "InstaPosts", post?.id, "comments") , orderBy("timestamp", "desc"));

  const comments= snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

//console.log("comments---------<>",comments);

const [snapshotLikes] = useCollection(collection(db, "InstaPosts", post?.id, "likes") , orderBy("timestamp", "desc"));

const likes= snapshotLikes?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

 



  return (
    <UserLayout userid={comment?.userid}>
      {/* -----herder  GoBack-- */}

      <div>
        {/* --grid ---- */}
        <div className=" grid grid-cols-12">
          <div className="  phone:col-span-12 laptop:col-span-7">
            <div className="my-4">
              {/* ----back header---- */}

              <div className=" laptop:mx-6 phone:mx-14">
                <div className=" flex gap-8 w-[70%] mx-auto">
                  <div>
                    <p
                      onClick={() => router.back()}
                      className="transition-all duration-500   hover:bg-[#CDF0EA] rounded-full text-center"
                    >
                      <div className="w-12 h-12 hover:text-[#3AB4F2]">
                        <BsArrowLeft className=" text-3xl font-bold relative top-2 left-2 " />
                      </div>
                    </p>
                  </div>

                  <div>
                    <div>
                      <p className="text-2xl  font-semibold mt-[2px] hover:text-[#3AB4F2]">
                        Comment
                      </p>
                    </div>
                  </div>
                </div>

{/* ------post image and info---- */}

<div className=" mx-6 my-4">


<div className="">


<div>
  <PostCard cathide={true} post={post} />
</div>


<div>
  {likes?.length}
</div>








</div>










</div>



              </div>
            </div>
          </div>




          {/* --Revalted 🔥🔥🔥🔥🔥🔥 users of comment---- */}

          <div className="  phone:col-span-0 laptop:block phone:hidden laptop:col-span-5"></div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Commentid;

export async function getServerSideProps(context) {
  const id = context.query.postid;
  const comid = context.query.commentid;
  console.log("id--->", id);
  const snapshot = await getDoc(doc(db, "InstaPosts", id));
  const commentsnapshot = await getDoc(
    doc(db, "InstaPosts", id, "comments", comid)
  );

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
