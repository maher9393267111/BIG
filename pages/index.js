import Head from 'next/head'
import NextHead from "../components/global/NextHead";
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Box } from '@chakra-ui/react'
import MapComponent from '../components/maps/map'
import dynamic from 'next/dynamic';
import {useState,useEffect} from 'react'




export default function Home() {

const [image,setImage] = useState('https://www.instagram.com/static/images/homepage/screenshots/screenshot1.png/fdfe239b7c9f.png')

const images = [
'https://www.instagram.com/static/images/homepage/screenshots/screenshot1.png/fdfe239b7c9f.png',
'https://www.instagram.com/static/images/homepage/screenshots/screenshot2.png/4d62acb667fb.png',
'https://www.instagram.com/static/images/homepage/screenshots/screenshot4.png/a4fd825e3d49.png',


]

const [currentImage,setCurrentImage] = useState('https://www.instagram.com/static/images/homepage/screenshots/screenshot4.png/a4fd825e3d49.png')

useEffect(() => {
  const intervalId = setInterval(() => {
      setCurrentImage(images[Math.floor(Math.random() * images.length)]);
  }, 1000)
  
  return () => clearInterval(intervalId);
}, [])







  return (
    <div className={styles.container}>
        <NextHead
        title="Home"
        metaDescription="Audiophile is the premier store for high end headphones, earphones, speakers, and accessories. Browse our collection."
      />

<div>




<div className=' flex gap-8 w-[69%] mx-auto '>

{/* ----lefty image--- */}
<div className='relative tablet:hidden laptop:block'>
  <img src="https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png" alt="" />


<div className='absolute  top-[-15px] left-[154px]'>
<img className='h-[531px] w-[250px] my-12'  src={currentImage} alt="" />
</div>

</div>


{/* -------Right Form---- */}
<div>
  form
</div>




</div>










</div>








     
    </div>
  )
}
