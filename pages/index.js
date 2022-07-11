import Head from 'next/head'
import NextHead from "../components/global/NextHead";
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Box } from '@chakra-ui/react'
import MapComponent from '../components/maps/map'
import dynamic from 'next/dynamic';
import {useState,useEffect} from 'react'
import { Placemark } from 'react-yandex-maps';




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


const [formData, setformData] = useState({
       
  email: '',
  password: '',
  userName: '',
  fullName: '',
  phone: '',
  
  
});

const {password,email,userName,fullName,phone} = formData;



const onChange = e => setformData({...formData, [e.target.name]: e.target.value});





  return (
    <div className={styles.container}>
        <NextHead
        title="Home"
        metaDescription="Audiophile is the premier store for high end headphones, earphones, speakers, and accessories. Browse our collection."
      />

<div>




<div className=' flex gap-8 w-[69%] mx-auto mt-24 '>

{/* ----lefty image--- */}
<div className='relative phone:hidden laptop:block'>
  <img src="https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png" alt="" />


<div className='absolute  top-[-15px] left-[154px]'>
<img className='h-[531px] w-[250px] my-12'  src={currentImage} alt="" />
</div>

</div>


{/* -------Right Form---- */}
<div>
  
{/* ----form--- */}
<div className='w-[372px] h-[622px] border-2 border-blue-400'>


{/* ----all conten wrapper---- */}
<div className=' container'>

{/* ----insta logo--- */}
<div className='mt-12 text-center mx-28'>
<div>
  <img 
  className='block w-[175px] h-[52px] '
  src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" />
</div>


</div>



{/* --- all texts wrapper--- */}

<div className=' container w-[277px] ml-12   mt-8'>
 
<div>
  <p className=' text-center text-[18px] font-semibold'>Sign up to see photos and videos from your friends.</p>
</div>


{/* ---sign in with google---- */}
<div>


<div className='my-4  '>
  <button className=' bg-black text-white py-2 px-2  w-full rounded-xl'> <img
  className=' inline-block w-10 h-10 mr-6 rounded-full font-bold'
  
  src="https://cdn4.iconfinder.com/data/icons/socialcones/508/Google-256.png" alt="" />Sign In with Google </button>
</div>



</div>



{/* ----register with form--- */}
<div>

<form>

{/* ---header--- */}


<div>
  <p className='or relative text-center text-xl font-bold'>OR</p>
</div>


<div>


{/* ----email or mobile number---- */}
<div className='my-[6px]'>

<input 
 onChange= { e => onChange(e) }
name = 'email'

className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight    focus:outline-slate-400 focus:shadow-outline" id="username" type="text" placeholder="Mobile Or Number"/>
</div>





<div className='my-[6px]'>

<input
 onChange= { e => onChange(e) }
name = 'fullName'
className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight    focus:outline-slate-400 focus:shadow-outline" id="username" type="text" placeholder="fullName"/>
</div>

<div className='my-[6px]'>

<input
 onChange= { e => onChange(e) }
name='userName'
className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight    focus:outline-slate-400 focus:shadow-outline" id="username" type="text" placeholder="userName"/>
</div>


<div className='my-[6px]'>

<input 
 onChange= { e => onChange(e) }
name = 'password'
className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight    focus:outline-slate-400 focus:shadow-outline" id="username" type="password" placeholder="password"/>
</div>


<div className='my-4 text-center font-semibold'>
  <h1>
By signing up, you agree to our Terms , Data Policy and Cookies Policy .</h1>
</div>



{/* ----register button---- */}


<div>

  <div className=' text-center'>
    <button
    type ='submit'
    className={`  ${ fullName === '' || email === '' || password === '' ? 'opacity-[0.5]' : 'opacity-1'}   bg-blue-500 text-white font-bold p-2 rounded-md  block w-full `}
    disabled={   fullName === '' || email === ''  || password === ''}
    
    >Sign Up</button>
  </div>
</div>


<div>
  {password}
  {email}
  {userName}
  {fullName}
</div>








</div>





</form>







</div>






</div>




</div>



</div>


</div>




</div>










</div>








     
    </div>
  )
}
