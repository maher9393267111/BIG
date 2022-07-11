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
'https://www.instagram.com/static/images/homepage/screenshots/screenshot1.png/fdfe239b7c9f.png',


]


// change image  every 5s
useEffect(() => {
 
  changeimage()
  return () => clearInterval(changeimage);
}, [])



 const changeimage = () => {

  setInterval(() => {
       
      setImage(images[Math.floor(Math.random() * images.length)]);
  }
  , 2000);
 }




  return (
    <div className={styles.container}>
        <NextHead
        title="Home"
        metaDescription="Audiophile is the premier store for high end headphones, earphones, speakers, and accessories. Browse our collection."
      />

<div>


<img className='h-[200px] w-[200px] my-12' src={image} alt="" />


</div>








     
    </div>
  )
}
