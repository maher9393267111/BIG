import React from "react";
import {allfollowing } from '../utils/db'
import Moment from "moment";
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
import PostCard from "../components/main/postCart";
import CommentIcons from "../components/commentPage/commentIcons";
import InputComment from "../components/commentPage/commentInput";
import ReplayList from "../components/commentPage/ReplayList";
import Revaltedusers from "../components/commentPage/revaltedusers";
const Commentid = ({ post, comment }) => {
  const router = useRouter();
  const { userinfo } = useAuth();
  const [refresh, setRefresh] = useState(false);
const [authuserFollowing, setAuthUserFollowing] = useState([]);
  const [snapshot] = useCollection(
    collection(db, "InstaPosts", post?.id, "comments"),
    orderBy("timestamp", "desc")
  );

  const comments = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  //console.log("comments---------<>",comments);

  const [snapshotLikes] = useCollection(
    collection(db, "InstaPosts", post?.id, "likes"),
    orderBy("timestamp", "desc")
  );

  const likes = snapshotLikes?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));


  const [snapshotreplays] = useCollection(
    collection(db, "InstaPosts", post?.id, "comments", comment?.id, "CommentComments"),
    orderBy("timestamp", "desc")
  );

  const Replays = snapshotreplays?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));



  const [snapauth] = useCollection(
    userinfo?.id !== undefined &&   collection(db, "users", userinfo?.id , "following"),
   // orderBy("timestamp", "desc")
  );

  const authfo = snapauth?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log("authfo🥁🥁🥁🥁🥁🥁---------<>",authfo);




useEffect(() => {

if (userinfo?.id !== undefined) 
{

  allfollowing(userinfo.id).then((response) => {
    setAuthUserFollowing(response);
   // console.log("RESPONSEEE-🔴🔴🔴-------<>",response);
  //  console.log("authUserFollowing🌟🌟🌟--->", authuserFollowing);
  })
}
  

}, [userinfo?.id,refresh]);







  return (
    <UserLayout userid={comment?.userid}>
      {/* -----herder  GoBack-- */}

      <div className=" pb-20">
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

                    <div className=" -mt-4">
                      <CommentIcons
                        comNumber={comments?.length}
                        likesNumber={likes?.length}
                      />
                    </div>

                    {/* -comment details---- */}

                    <div className=" mt-4">
                      <div className=" flex gap-4 mt-6">
                        <div>
                          <img
                            className=" w-[77px] h-[77px] rounded-full"
                            src={comment?.userImg}
                            alt=""
                          />
                        </div>

                        <div className=" mt-2 text-[17px] font-semibold">
                          <p>{comment?.name}</p>

                          <p className=" mt-2 tg">
                            reply{" "}
                            <span className=" text-blue-500">
                              @{comment?.replyto}
                            </span>{" "}
                          </p>
                        </div>

                        {/* ----comment text---- */}

                        <div></div>
                      </div>

                      {/* ---margin here---- */}

                      <div className="mt-6  ml-24 h-[100px]">
                        <div>
                          <p className="text-xl font-semibold">
                            {comment?.comment}
                          </p>
                        </div>

                        {/* comment date--- */}
                        <div>
                          <p className=" text-xl font-semibold text-blue-400 my-6">
                            {Moment(
                              new Date(comment?.timestamp?.seconds * 1000)
                            ).format("MMM DD, YYYY h:mm a")}
                          </p>
                        </div>

{/* reply to this comment input start--- */}

<div>

 {/* -if auth suer is ownerer this comment dont show reply input---- */}
  <div>
    {userinfo?.id === comment?.userid ? (

<div>


   
   
   </div>
    ):(

      <div>
         <InputComment
    comment={comment}
    postid={post?.id}
    userinfo={userinfo}
    />
      </div>

    )}

    
 
  </div>

{/* --------comment replysList start---  */}
<div className=" pb-24">

<div>
  {Replays?.map((replay,i) => (

<div className=""  key={i}>

  <ReplayList replay={replay} />

</div>

  ))}

</div>




</div>



</div>



                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --Revalted 🔥🔥🔥🔥🔥🔥 users of comment---- */}

          <div className="  phone:col-span-0 laptop:block phone:hidden laptop:col-span-5">

<div>
  <Revaltedusers 
  refresh={refresh}
  setRefresh={setRefresh}
  
  authUserFollowing={authfo}
  postid={post?.id} commentby={comment?.userid} postedby={post?.postedbyId} userinfo={userinfo}  />
</div>



          </div>
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
