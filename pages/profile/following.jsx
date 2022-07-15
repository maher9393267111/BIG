import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
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
  onSnapshot
} from "firebase/firestore";
import safeJsonStringify from "safe-json-stringify";
//import Tab from '../../components/user/Tab';
import { db } from "../../firebase";
import {
  ExistChat,
  Follow,
  unfollow,
  allfollowing,
  findUserById,
} from "../../utils/db";
import NextHead from "../../components/global/NextHead";
import {
  chunk,
  cloneDeep,
  orderBy as orderByFunction,
  differenceBy,
} from "lodash";
const Following = ({  }) => {
  const router = useRouter();
  const { userid } = router.query;
  const { userinfo } = useAuth();
  // find pathname
  const pathname = router.pathname;
  console.log("pathname--->", pathname);

  const [following, setFollowing] = useState([]);
  
  const [authuserFollowing, setAuthuserFollowing] = useState([]);




  const [user, setUser] = useState({});

  const fetchuser = async () => {
    const productRef = doc(db, "users", userid);
    const product = await getDoc(productRef);

    setUser({ id: userid, ...product.data() });

 
    const q = query(collection(db, "users",userid,'following'), 
   // where("groupid", "==", groupid)
    );
 const unsub = onSnapshot(q, (QuerySnapshot) => {
   let postsArray = [];
   QuerySnapshot.forEach((doc) => {
     postsArray.push({ ...doc.data(), id: doc.id });
   });
   //console.log("from vivek", postsArray);
    setFollowing(postsArray);
   
  // setTodos(postsArray);
 });



  }




const fetchAuthuserFollowing = async () => {

    const q = query(collection(db, "users",userinfo?.id,'following'), 
    // where("groupid", "==", groupid)
     );
  const unsub = onSnapshot(q, (QuerySnapshot) => {
    let postsArray = [];
    QuerySnapshot.forEach((doc) => {
      postsArray.push({ ...doc.data(), id: doc.id });
    });
    //console.log("from vivek", postsArray);
     setAuthuserFollowing(postsArray);
    
   // setTodos(postsArray);
  });
 

}









  useEffect(() => {

      if ( userid ) {
       
        fetchuser();

      
  }
  }, [userid,db,userinfo])


  useEffect(() => {

    if ( userinfo?.id !== undefined ) {
     
    fetchAuthuserFollowing();

    
}
}, [userid,db,userinfo])






   



  

  const makeFollow = async (user) => {
    
    Follow(userinfo, user);
  };

  // make unfollow

  const makeUnfollow = async (user) => {
    //console.log("--->👉️👉️👉️👉️👉️👉️", user);
   // e.preventDefault();
    unfollow(userinfo, user);
  };

  return (
    <UserLayout userid={userid} user={user} noNavbar={true}>
      <div className=" container mx-12">
        {/* ---flex followers and following--- */}
        <div className=" flex laptop:justify-between mx-12 phone:w-[277px] laptop:w-[422px] font-semibold text-[#536471]">
          {/* ----followers--- */}

{authuserFollowing?.length}
          <div className="pfd">
            <Link href={`/profile/followers?userid=${userid}`}>
              <div
                className={` w-full h-full cursor-pointer text hover:bg-[#EAF6F6] `}
              >
                <p className="pf">followers</p>
              </div>
            </Link>
          </div>

          {/* ---following--- */}

          <div className="pfd">
            <div
              className={`${(pathname = "/profile/following"
                ? " "
                : " ")}    cursor-pointer  text-2xl hover:bg-[#EAF6F6] w-full h-full `}
            >
              <p
                className={`${(pathname = "/profile/following"
                  ? "hell "
                  : " ")} pf `}
              >
                following
              </p>
            </div>
          </div>
        </div>

        {/* ----followersList show---- */}

        <div className=" overflow-scroll scrollbar-hide h-[80vh] ml-12  phone:w-[277px] laptop:w-[422px] font-semibold text-[#536471]">
          <div>
            {following?.length > 0 ? (



              <div>
                {/* // -----sharing following users show----- */}
                <div>

              
                    {following
                    .filter(item => authuserFollowing.find(item2 => item2.id === item.id))
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

              
{following
   .filter(item => !authuserFollowing.find(item2 => item2.id === item.id))
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
};

export default Following;
