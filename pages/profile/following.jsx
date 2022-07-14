import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import UserLayout from "../../components/user/userLayout";
import { useAuth } from "../../context/index";
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
    const q2 = query(collection(db, "users",userinfo?.id,'following'), 
    // where("groupid", "==", groupid)
     );
  const unsub2 = onSnapshot(q2, (QuerySnapshot) => {
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
        fetchAuthuserFollowing();
        fetchuser();

      
  }
  }, [userid,db,userinfo])



  //console.log("user💡💡💡💡",userid);

  // const [user] = useDocumentData(doc(db, "users", userid));
  // //console.log("user following---->💡💡💡💡",user);

  // const q = query(
  //     collection(db, "users", userid, "followers"),

  //   );

  // const check  = authfo?.forEach((item) => {

  //     // chec every user in following collection in this user page

  //     const check2 = following?.filter((following) => { return following.id === item.id})
  //    // console.log("👉️👉️👉️👉️👉️👉️",check2);

  // })

  // useEffect(() => {

  // checkitems();
  // }, [followers]);

  const makeFollow = async (user) => {
    
    Follow(userinfo, user);
  };

  // make unfollow

  const makeUnfollow = async (user) => {
    console.log("--->👉️👉️👉️👉️👉️👉️", user);
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
                {following?.map((user) => {
                  return (
                    <div key={user?.id} className="my-12">
                      <div className=" flex justify-between">
                        {/* ---image and name and email---- */}

                        <div className="flex gap-6">
                          {/* ---image-- */}
                          <div>
                            <img
                              className="w-20 h-20 rounded-full"
                              src={user?.image}
                              alt="userImage"
                            />
                          </div>

                          {/* name and email */}

                          <div className=" font-semibold phone:text-sm  laptop:text-xl">
                            <p> {user?.name}</p>

                            <p>{user?.email}</p>
                          </div>
                        </div>

                        {/* ----follow bitton---- */}

                        <div className="">
                          {userid === userinfo?.id && (
                            <button
                              onClick={()=>makeUnfollow(user)}
                              className={`   bg-red-500  rounded-full px-4 py-2 text-white`}
                            >
                              Unfollow
                            </button>
                          )}
                        </div>



{/* // if not this user page  show follow this users button--- */}


<div className="">
                          {userid !== userinfo?.id && (
                            <button
                              onClick={()=>makeFollow(user)}
                              className={`   bg-blue-500  rounded-full px-4 py-2 text-white`}
                            >
                              follow
                            </button>
                          )}
                        </div>



                      </div>
                    </div>
                  );
                })}
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
