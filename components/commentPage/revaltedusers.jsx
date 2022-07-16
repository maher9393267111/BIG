import React from 'react';

const Revaltedusers = ({postedby,commentby,userinfo,postid 
,authUserFollowing


}) => {

    //console.log("postOwner is--->", postedby);
// check if user is following the postedby user

    const isFollowing =(arg)=> authUserFollowing.find(
        (user) => user.name === arg
    );

    console.log("isFollowing💡💡💡💡--->", isFollowing);



    return (
        <div>

{isFollowing(commentby) ? 'he is following' : ' he is not following'}

{authUserFollowing?.length}
           
<div>













</div>




        </div>
    );
}

export default Revaltedusers;
