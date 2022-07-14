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
import { CgAbstract } from "react-icons/cg";

const Profile = ({ user }) => {
 // console.log("date------>", user.createdAt);

  const { userinfo, handleOnotherUser } = useAuth();
  const currentDate = <Moment format="YYYY/MM/DD">{user.createdAt}</Moment>;

  

const [checkfollow, setCheckfollow] = useState(false);


  const router = useRouter();
  const chatme = (
    <div>
      <p>Go to Chat</p>
    </div>
  );



  const q = query(
    collection(db, "users", user.id, "followers"),
    
  );
  const [followers, loading] = useCollectionData(q);
console.log("followers🛹🛹🛹",followers);


const q2 = query(
  collection(db, "users", user.id, "following"),
  
);
const [following] = useCollectionData(q2);
console.log("following is➿➿➿",following);




const check = followers?.filter((follower) => { return follower.id === userinfo.id})
console.log("check",check);







// create new chat if not created yet Else go to already created chat
  const newChat = async () => {
    // search where th auth user and the user is in the chat if not create a new chat

    ExistChat(userinfo.email, user.email).then(async (chat) => {
      if (chat == undefined) {
        const chatmaked = await addDoc(collection(db, "chats"), {
          users: [userinfo.email, user.email],

          usersData: [
            {
              email: userinfo.email,
              name: userinfo.name,
              image: userinfo.image,
              id : userinfo.id,
              

            },
          {
            email: user.email,
            name: user.name,
            image: user.image,
            id : user.id,
           

          }],
          timestamp: serverTimestamp(),
        });

        await router.push(`/chat?chatid=${chatmaked.id}`);
        message.info("New Chat created");
      } else if (chat !== [] || chat !== undefined || chat === null) {
        message.info("You are already in this chat");
        console.log("chat in Profile--->", chat);
        router.push(`/chat?chatid=${chat?.id}`);
      }
    });
  };


// make follow

const makeFollow = async (e) => {

  e.preventDefault();
  Follow(userinfo,user)

}


// make unfollow

  const makeUnfollow = async (e) => {

    e.preventDefault();
    unfollow(userinfo,user)
  }



  return (
    <UserLayout
    userid={user.id}
    >
      <NextHead
        title="profile"
        metaDescription="user profile page here
        "
      />

      <div className="mb-20 pb-20 mx-4">
        <div>
          {/* ----user  cover and his image section ----- */}

          <div>
            <div className="  bg-cover h-[350px] relative   ">
              {/* -----user image--- */}

              <div className="absolute phone:bottom-[-50px] laptop:bottom-[-70px]  bg-slate-50 rounded-full ml-16">
                <img
                  className=" laptop:w-[9rem] laptop:h-[9rem] phone:h-[6rem] phone:w-[6rem]  rounded-full  hover:"
                  src={user?.image}
                  alt=""
                />
              </div>
            </div>

        
            <div className=" text-right mt-12 mr-12">

             
         {userinfo?.id !== user?.id &&  
       
<button
 onClick={  check?.length > 0 ?  makeUnfollow : makeFollow }
className =  {`  ${check?.length > 0 ?  "bg-red-500" : "bg-blue-500"}  rounded-full px-4 py-2 text-white`}
 >
   {check?.length > 0 ? "Unfollow" : "Follow"}
 </button>
}
 </div>




          {/* ----- follow bottn---- */}

            <div className=" mt-6 mb-6 text-right mr-12  ">
            

              {/* ---chat buton--- */}

              {userinfo.name !== undefined && userinfo.name !== user.name && (
                <div className=" text-right">
                  <Popover placement="topRight" content={chatme}>
                    {/* <Link href={`/chat/${user?.id + userinfo?.id}`}> */}
                    <p onClick={newChat} className=" relative -top-6">
                     
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-8 h-8 rounded-full cursor-pointer r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"><g><path d="M19.25 3.018H4.75C3.233 3.018 2 4.252 2 5.77v12.495c0 1.518 1.233 2.753 2.75 2.753h14.5c1.517 0 2.75-1.235 2.75-2.753V5.77c0-1.518-1.233-2.752-2.75-2.752zm-14.5 1.5h14.5c.69 0 1.25.56 1.25 1.25v.714l-8.05 5.367c-.273.18-.626.182-.9-.002L3.5 6.482v-.714c0-.69.56-1.25 1.25-1.25zm14.5 14.998H4.75c-.69 0-1.25-.56-1.25-1.25V8.24l7.24 4.83c.383.256.822.384 1.26.384.44 0 .877-.128 1.26-.383l7.24-4.83v10.022c0 .69-.56 1.25-1.25 1.25z"></path></g></svg>
                    </p>
                    {/* </Link> */}
                  </Popover>
                </div>
              )}
            </div>

            {/* -----user inf---- */}

            <div className="ml-8 mt-12">
              <div className=" ">
                <h1 className="text-xl font-semibold tg">{user.name}</h1>

                <h1 className="font-semibold text-xl my-2 tg"> {user.email}</h1>

                <div className="pb-22 mt-2">
                  <h2 className=" tg font-semibold my-4">
                    <img
                      className="inline-block h-6 w-6 mr-2"
                      src="https://cdn0.iconfinder.com/data/icons/basic-thin-ios/512/appointment_calendar_coming_soon_daily_date_datepicker_day_deadline_estimate_event_future_meeting_month_dates-256.png"
                      alt=""
                    />
                    Joined At {currentDate}
                  </h2>


                  {/* ----user sozu if it exist---- */}

                  <div>
                    <p className="tg text-[17px] mb-4 font-medium">{user?.quote ? user.quote : 'Gitme Dur! Daha şimdiden deliler gibi özledim'}</p>
                  </div>

                  {/* ------followers  and following ---- */}

                  <div>
                    <div className="text-xl flex gap-12 tg font-semibold">
                      <div className=" cursor-pointer">
                      <Link href={`/profile/following?userid=${user.id}`}>
                        <p className="">Following  <span>{following?.length}</span></p>
                      </Link>
                      </div>

                      <div className=" cursor-pointer">
                        <Link href={`/profile/followers?userid=${user.id}`}>
                        <p>Followers  <span>{followers?.length}</span></p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Profile;

export async function getServerSideProps(context) {
  const id = context.params.userid;
  console.log("id--->", id);
  const snapshot = await getDoc(doc(db, "users", id));

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
