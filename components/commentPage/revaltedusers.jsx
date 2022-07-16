import React from "react";
import { Follow, unfollow, findUserById } from "../../utils/db";
import { useState, useEffect } from "react";

const Revaltedusers = ({
  postedby,
  commentby,
  userinfo,
  postid,
  authUserFollowing,
}) => {
  //console.log("postOwner is--->", postedby);
  // check if user is following the postedby user

  const isFollowing = (arg) =>
    authUserFollowing.filter((user) => user.name === arg);

  //console.log("isFollowing💡💡💡💡--->", isFollowing);

  const makeFollow = async (user) => {
    Follow(userinfo, user);
  };

  //console.log('authUserFollowing💡💡💡💡--->', authUserFollowing);

  const check2= (userarg) => {
    authUserFollowing?.map((user) => {
      return (
        <div>
          <h1>
            <button>{user?.name === userarg ? "follow " : "unfollow"}</button>as
          </h1>
        </div>
      );
    });
  };


  const check = (userarg) => {
    

authUserFollowing?.filter((user) => {
//console.log("user--->", user);
    return  user?.name === userarg ? 'follow' : 'unfollow';
    //  user?.name === userarg ? (
    //     <div>asas</div>
    // ) : (<div>asas </div> );

})

    

  };



  const [postuser, setPostuser] = useState({});
  const [comuser, setCommentuser] = useState({});

  useEffect(() => {
    //  console.log("posti🛑🛑🛑--->", postedby);
    if (postedby) {
      findUserById(postedby).then((user) => {
        setPostuser(user);
      //  console.log("postuser-🛑 aaaaa  🛑  🛑-->", postuser);
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
    //console.log("--->👉️👉️👉️👉️👉️👉️", user);
    // e.preventDefault();
    unfollow(userinfo, user);
  };

  return (
    <div>
      {/* {isFollowing(commentby) } */}

      {/* {authUserFollowing?.length} */}

      <div>
        {/* -header----- */}

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
                  src={postuser?.image}
                  alt=""
                />
              </div>

              <div className="text-[17px] mt-4 font-semibold ">
                <p className=" mb-[3px]">{postuser?.name}</p>
                <p>{postuser?.email}</p>
              </div>

              {/* ---follow or unfollow button--- */}

              <div className=" flex-1">{check(postuser?.name)}</div>
            </div>
          </div>

          {/* ----commenteduser--- */}

          <div className="my-8"></div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Revaltedusers;
