import React from 'react';
import { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import UserLayout from "../../components/user/userLayout";
import { useAuth } from "../../context/index";
import FollowList from "../../components/user/usersFollowList";
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
  import { Follow,unfollow ,allfollowers, findUserById,allfollowing } from "../../utils/db"
import { CheckboxGroup } from '@chakra-ui/react';
const Followers = ({}) => {

    const router = useRouter();
    const { userid } = router.query;
    const {userinfo} = useAuth();

    // find pathname
    const pathname = router.pathname;
  //  console.log("pathname--->",pathname);
 

    const [followers, setFollowers] = useState([]);
const [user, setUser] = useState({});
const [authuserFollowers, setAuthuserFollowers] = useState([]);
const [refresh, setRefresh] = useState(false);
useEffect(() => {

     if (userid) {
 
    allfollowers(userid).then(res => {
       // console.log("RESPONSE------>💡💡💡💡",res);
        setFollowers(res);
    })
}

}, [userid,db])


useEffect(() => {

    if (userinfo?.id) {

        allfollowing(userinfo?.id).then(res => {
      // console.log("RESPONSE------>💡💡💡💡",res);
       setAuthuserFollowers(res); // ✔✔✔
    //   console.table('authUser followers',res);
   })
}

}, [db,refresh])







useEffect(() => {

    if ( userid) {

    findUserById(userid).then(res => {
//console.log("RESPONSE NExtjs--------->💡💡💡💡",res); //💖💖💖💖
        setUser(res);
    })
}
}, [userid])



const makeFollow = async (user) => {
    
    Follow(userinfo, user);
    setRefresh(!refresh);
  };

  // make unfollow

  const makeUnfollow = async (user) => {
    //console.log("--->👉️👉️👉️👉️👉️👉️", user);
   // e.preventDefault();
    unfollow(userinfo, user);
    setRefresh(!refresh);
  };







    return (
     

<UserLayout
userid={userid}
noNavbar={true}
user ={user}
>


<div className=' container mx-12'>


{/* ---flex followers and following--- */}
<div className=' flex justify-between mx-12 phone:[230px] laptop:w-[422px] font-semibold text-[#536471]'>

{/* ----followers--- */}

<div className='pfd '>

<div className={`${pathname ='/profile/followers'  ? ' ' : ' '}  text  cursor-pointer w-full h-full   hover:bg-[#EAF6F6] `}>
    <p className={`${pathname ='/profile/followers'  ? 'hell ' : ' '} pf `}>  follower</p>
  
</div>



</div>


{/* ---following--- */}

<div className='pfd'>
<Link href={`/profile/following?userid=${userid}`}>
    <div className={` cursor-pointer text hover:bg-[#EAF6F6] w-full h-full `}>
       
        <p className='pf'> following </p>
    </div>
</Link>

</div>

</div>



{/* ----followersList show---- */}

<div className=" overflow-scroll scrollbar-hide h-[80vh] ml-12  phone:w-[277px] laptop:w-[422px] font-semibold text-[#536471]">
          <div>
            {followers?.length > 0 ? (



              <div>
                {/* // -----sharing following users show----- */}
                <div>

              
                    {followers
                    .filter(item => authuserFollowers.find(item2 => item2.id === item.id))
                    .map(t => {
                      return (
                        <div key={t?.id}>
                       <FollowList authuser ={userinfo} following={t} deleteme ={true} makeUnfollow ={makeUnfollow} makeFollow={makeFollow} />
                        </div>
                      );
                    })}
</div>
                


         {/* // ----- NNNNot Same   following users show----- */}
         <div className="">

              
{followers
   .filter(item => !authuserFollowers.find(item2 => item2.id === item.id))
.map(t => {
  return (
    <div key={t?.id}>
   <FollowList authuser ={userinfo} following={t} add ={true} makeUnfollow ={makeUnfollow} makeFollow={makeFollow} />
    </div>
  );
})}
</div>




              </div>
            ) : (
              <div>
                <div>
                  <h1 className="text-2xl my-12 text-center">
                    No Followers Yet
                  </h1>
                </div>
              </div>
            )}
          </div>
        </div>




</div>

</UserLayout>
            
       
    );
}

export default Followers;


