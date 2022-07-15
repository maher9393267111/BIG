import React from "react";
import VideoCard from "./videoCard";
import Link from "next/link";
//import Moment from 'moment';
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";

const PostCart = ({ post,cathide=false }) => {
  const {
    videos,
    topic,
    postedby,
    postedbyImage,
    caption,
    id,
    potedbyEmail,
    cretedAt,
  } = post;

  return (
    <div className={ `my-4 mx-4 ${cathide ? 'pb-2 ' : 'pb-20'} `}>
      {/* -----if image show image else sitis video show video--- */}

      {post?.image?.image !== "" ? (
        <div>
          <div className=" flex mb-6">
            <div className="phone:w-16 phone:h-16 w-10 h-10 cursor-pointer">
              <Link href={`/profile/${potedbyEmail}`}>
                <img
                  className=" rounded-full w-[66px] h-[66px]"
                  src={postedbyImage}
                  alt="user-profile"
                />
              </Link>
            </div>

            <div>
              <p className="tg text-xl mt-[12px] ml-2">{postedby}</p>
            </div>
            <div className=" font-bold  text-[#0078AA] text-sm ml-2 mt-[16px]">
              <p>
                CreatedAt{" "}
                <Moment format="DD MMM YYYY, HH:mm">{cretedAt}</Moment>
              </p>
            </div>

            <div>
              {/* -----posts text--- */}

              {/* <ReactMarkdown children={caption}/> */}
            </div>
          </div>

          <div className="w-full phone:h-[300px] tablet:h-[388px] laptop:h-[366px]  relative">
            <Link href={`/post/${id}`}>
            <img
              className="w-full h-full cursor-pointer rounded-lg object-contain"
              src={post.image && post.image.image}
              alt=""
            />
            </Link>

            {/* ---absolute topic show--- */}

            <div className={  ` ${cathide ? 'hidden' : 'block'} absolute`}>
              <p className="border-2 font-bold p-2 w-28 bg-blue-600  text-white rounded-full text-center ">
                {" "}
                {post?.topic}
              </p>
            </div>
          </div>
        </div>
      ) : (
        // ----show video---
        <div>
          <VideoCard cathide={cathide} post={post} />
        </div>
      )}
    </div>
  );
};

export default PostCart;
