import React from 'react';
import VideoCard from './videoCard';
import Link from 'next/link';
//import Moment from 'moment';
import Moment from 'react-moment';
import ReactMarkdown from 'react-markdown';

const PostCart = ({ post }) => {

  const { videos, topic, postedby, postedbyImage, caption, id, potedbyEmail,cretedAt } = post

  return (
    <div className='my-4 mx-4 pb-20'>

      {/* -----if image show image else sitis video show video--- */}


      {post?.image?.image !== '' ? (
        <div>

          <div className=' flex mb-6'>



            <div className='md:w-16 md:h-16 w-10 h-10'>
              <Link href={`/profile/${potedbyEmail}`}>
                <>
                  <img

                    className=' rounded-full w-[66px] h-[66px]'
                    src={postedbyImage}
                    alt='user-profile'

                  />
                </>
              </Link>


            </div>

            <div>
              <p className='tg text-xl mt-[12px] ml-2'>{postedby}</p>
            </div>
            <div className=  ' font-bold  text-[#0078AA] text-sm ml-2 mt-[16px]'>
              <p>  
               CreatedAt <Moment format="DD MMM YYYY, HH:mm"  >{cretedAt}</Moment>   
                 {/* {Moment(new Date(cretedAt?.seconds * 1000)).format(
              "MMM DD, YYYY h:mm a"
            )}  */}
            
            </p>
            </div>


<div>

  
{/* -----posts text--- */}

<ReactMarkdown children={caption}/>
</div>


          </div>





          <div className='w-full phone:h-[355px] tablet:h-[422px] laptop:h-[500px]  relative'>
            <img className='w-full h-full cursor-pointer rounded-lg object-cover' src={post.image && post.image.image} alt="" />


            {/* ---absolute topic show--- */}

            <div className=' absolute'>

              <p className='border-2 font-bold p-2 w-28 bg-blue-600  text-white rounded-full text-center '> {post?.topic}</p>


            </div>

          </div>
        </div>
      ) :


        // ----show video---
        (

          <div>
            <VideoCard post={post} />
          </div>


        )
      }







    </div>
  );
}

export default PostCart;
