import React from 'react';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { BsPlay } from 'react-icons/bs';
import {useState,useEffect,useRef} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
const VideoCard = ({post,homepage=false,cathide=false}) => {


const {videos,topic,postedby,postedbyImage,caption,id,potedbyEmail} = post

    const [playing, setPlaying] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const videoRef = useRef(null);
  

    const onVideoPress = () => {
        if (playing) {
          videoRef?.current?.pause();
          setPlaying(false);
        } else {
          videoRef?.current?.play();
          setPlaying(true);
        }
      };
    


      useEffect(() => {
        if (videoRef?.current) {
          videoRef.current.muted = isVideoMuted;
        }
      }, [isVideoMuted]);
    


      
      return (
        <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
          <div>
            <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded '>
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
                <Link href={`/profile/${potedbyEmail}`}>
                  <div className='flex items-center gap-2'>
                    <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                      {postedby}{' '}
                      <GoVerified className='text-blue-400 text-md' />
                    </p>
                    <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                      {postedby}
                    </p>
                  </div>
                </Link>
                <Link href={`/post/${id}`}>
                  <p className='mt-2 font-normal '>{caption}</p>
                </Link>
              </div>
            </div>
          </div>






          <div className='lg:ml-20 phone:mt-12  flex gap-4 relative'>
            <div
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              className='rounded-3xl w-full relative'
            >
              <Link href={`/post/${id}`}>
                <video
                  loop
                  ref={videoRef}
                  src={videos.video}
                  className={ `laptop:w-[900px]   laptop:h-auto w-full rounded-2xl cursor-pointer bg-gray-100`}
                ></video>
              </Link>
    
              {isHover && (
                <div className={ `absolute ${cathide ? 'laptop:bottom-24' : 'laptop:-bottom-12'}  cursor-pointer left-8 tablet:left-14 laptop:left-0 flex gap-10 laptop:justify-between ${cathide ? 'phone:w-[300px] justify-between' : ''}  laptop:w-[88%]  p-3`}>
                  {playing ? (
                    <button onClick={onVideoPress}>
                      <BsFillPauseFill className='text-black text-2xl lg:text-4xl' />
                    </button>
                  ) : (
                    <button onClick={onVideoPress}>
                      <BsFillPlayFill className='text-black text-2xl lg:text-4xl' />
                    </button>
                  )}
                  {isVideoMuted ? (
                    <button onClick={() => setIsVideoMuted(false)}>
                      <HiVolumeOff className='text-black text-2xl lg:text-4xl' />
                    </button>
                  ) : (
                    <button onClick={() => setIsVideoMuted(true)}>
                      <HiVolumeUp className='text-black text-2xl lg:text-4xl' />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };

   


export default VideoCard;