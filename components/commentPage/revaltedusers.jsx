import React from "react";
import { Follow, unfollow, findUserById } from "../../utils/db";
import { useState, useEffect } from "react";

const Revaltedusers = ({
  postedby,
  commentby,
  userinfo,
  postid,
  authUserFollowing,
    refresh,
    setRefresh,
}) => {
 
  const isFollowing = (arg) =>
    authUserFollowing.filter((user) => user.name === arg);


  const makeFollow = async (user) => {
    setRefresh(!refresh);
    Follow(userinfo, user);
  };

  const makeunfollowfunc = async (user) => {
    setRefresh(!refresh);
    unfollow(userinfo, user);
  };




const [checpostuser,setchecpostuser ] = useState([]);
const [commentusercheck,setcommentusercheck] = useState([]);


 

useEffect(() => {
    // like.id is doc from likes collection  and compare it with current user's id
    setchecpostuser(
      authUserFollowing?.findIndex((user) => user.id === postedby) !== -1
    );
    console.log("has liked---->", checpostuser);
  }, [authUserFollowing]);



  useEffect(() => {
    try {

      const fetchUserList = async () => {
       
        setcommentusercheck(
            authUserFollowing?.findIndex((user) => user.id === commentby) !== -1
          );
          console.log("has liked---->", commentusercheck);
      };

      fetchUserList();
      console.log( "RRRRRRRRRRRR")
     
    } catch (error) {
        console.log(error);
    }
  }, [authUserFollowing]);


  const [postuser, setPostuser] = useState({});
  const [comuser, setCommentuser] = useState({});

  useEffect(() => {
    //  console.log("posti🛑🛑🛑--->", postedby);
    if (postedby) {
      findUserById(postedby).then((user) => {
        setPostuser(user);
      //  console.log("REEEEEEFREEESH");
      });
    }
  }, [postedby, commentby]);

  useEffect(() => {
    if (commentby) {
      findUserById(commentby).then((user) => {
        setCommentuser(user);
        //     console.log("commentuser-🛑 aaaaa  🛑  🛑-->", comuser);
      });
    }
  }, [postedby, commentby]);

  // make unfollow

  const makeUnfollow = async (user) => {
    setRefresh(!refresh);
    unfollow(userinfo, user);
  };

  return (
    <div>
   

      <div>
       

        <div>
          <p className="text-center font-bold text-2xl">Relevant people</p>
        </div>

        {/* -----users show--- */}

        <div>
          {/* ----posteduser--- */}

          <div className="my-8">
            <div className=" flex gap-4">
              <div>
                <img
                  className=" w-[77px] h-[77px] rounded-full"
                  src={comuser?.image}
                  alt=""
                />
              </div>

              <div className="text-[17px] mt-4 font-semibold ">
                <p className=" mb-[3px]">{postuser?.name}</p>
                <p>{comuser?.email}</p>
              </div>

              {/* ---follow or unfollow button--- */}

              <div className=" flex-1 mt-4">


<div>



{checpostuser && (
<div className="ml-12"> <button

onClick={() => makeUnfollow(postuser)}
className="  bg-red-400 text-white font-bold text-center p-2 rounded-full  hover:bg-red-700">Unfollow</button> </div>) 

}

{ !checpostuser &&   (

<div
    onClick={() => makeFollow(postuser)} 
    
    className="  hover:bg-blue-700 bg-blue-400 text-white font-bold text-center p-2 rounded-full">follow</div>
)}


</div>


              </div>
            </div>
          </div>

          {/* ----commenteduser--- */}

          <div className="my-8">

          <div className=" flex gap-4">
              <div>
                <img
                  className=" w-[77px] h-[77px] rounded-full"
                  src={comuser?.image}
                  alt=""
                />
              </div>

              <div className="text-[17px] mt-4 font-semibold ">
                <p className=" mb-[3px]">{comuser?.name}</p>
                <p>{comuser?.email}</p>
              </div>

              {/* ---follow or unfollow button--- */}

              <div className=" flex-1 mt-4">

              { userinfo?.id !== comuser?.id && ( 
<div>

{commentusercheck && (
<div className="ml-12"> <button

onClick={() => makeUnfollow(comuser)}
className="  bg-red-400 text-white font-bold text-center p-2 rounded-full  hover:bg-red-700">Unfollow</button> </div>) 

}

{ !commentusercheck &&   (

<div
    onClick={() => makeFollow(comuser)} 
    
    className="  hover:bg-blue-700 bg-blue-400 text-white font-bold text-center p-2 rounded-full">follow</div>
)}



              </div>
                )}
              </div>
                
            </div>



          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Revaltedusers;
