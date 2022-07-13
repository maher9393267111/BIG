


import { useRouter } from 'next/router';
import Moment from "react-moment";
import  Link from 'next/link';
import { useState,useEffect } from 'react';
import {Button, Popover} from '@chakra-ui/react'
import {
    useCollectionData,
    useDocumentData,
  } from "react-firebase-hooks/firestore";
  import { query, orderBy, collection, doc,getDoc} from "firebase/firestore";
import safeJsonStringify from "safe-json-stringify";
//import Tab from '../../components/user/Tab';
import { db } from "../../firebase";
import NextHead from '../../components/global/NextHead';
import  Layout from '../../components/global/layout';
import {useAuth} from '../../context/index';
import {handleChatusers} from '../../utils/db';


const Chatid = ({}) => {

const {userinfo,onotherUser} = useAuth();

const [user,setUser] = useState({});

// react query
const {chatid} = useRouter().query;



    return (
       <div>
              
{/* ------chat header----- */}

<div>

{user?.name}
<div className=' flex my-6 mr-6'>

{/* ---userimage--- */}
<div>
    <img className='w-24 h-24 rounded-full mx-12' src={user?.image} alt="" />
</div>

<div className=' mt-10 text-xl font-bold'>
    <p>{user?.name}</p>
</div>

<div>
<p className='mt-12 ml-6'>
  <span className={`${user?.isOnline ? '  bg-green-400 dot' : '  bg-red-500 dot inline-block   '} rounded-full`}></span>
  </p>
  
</div>


</div>

<hr className='mx-12' />


{/* ----chat input---- */}

<div className='  fixed bottom-12'>
    

<div>

    <div className='mx-12'>
        hello
    </div>
</div>

</div>


</div>





       </div>
    );
}

export default Chatid;






// export async function getServerSideProps(context) {
//     const id = context.params.chatid;
//     console.log("id--->",id);
//     const snapshot = await getDoc(doc(db, "users", id));
    
  
//     const userdata = snapshot.data();
  

//     if (!userdata) {
//       return {
//         notFound: true,
//       };
//     }
  
//      userdata.id = snapshot.id;
  
//   //  strignfy the data
//     const chatwith = JSON.parse(
//       safeJsonStringify({ id: snapshot.id, ...snapshot.data() }) // needed for dates
//     );


  

//     return {
//       props: { chatwith},
//     };
//   }
