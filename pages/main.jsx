import React from 'react';
import Layout from '../components/global/layout';
import NextHead from '../components/global/NextHead';
import TopicsNav from '../components/global/topicsNav';
import { AllPosts,PostsByTopic} from '../utils/db'
import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '../components/main/sidebar';
import Posts from '../components/main/posts';
const Main = () => {

    const [posts, setPosts] = useState([]);

    // current query
    const router = useRouter();
    const { topic } = router.query;
    console.log('🌟🌟🌟--->',topic);



    useEffect(() => {

        if (topic) {
        
          PostsByTopic(topic).then(posts => {
            setPosts(posts);
            console.log('🌟🌟🌟ALLPOSTS--->',posts);
          }).catch(err => {
            console.log(err);
          }).finally(() => {
            console.log('finally');
          }
          )
        }
        
        if (topic ===  undefined  || topic === null) {
        
        
          AllPosts().then(res => {
            setPosts(res)
            console.log('res-----💠💠💠->',posts)
          } )
        
        }
        }, [topic])




    return (
        <Layout>
  <NextHead
        title="Home"
        metaDescription="Audiophile is the premier store for high end headphones, earphones, speakers, and accessories. Browse our collection."
      />

<div>
    <TopicsNav />
</div>


        <div className=' my-6'>
           

{/* ----flex   suggested users and posts section -- */}

           <div  className='  mx-4 '>

{/* ----- suggested users section ---- */}





{/* ------posts section---- */}

<div className=' '>

<Posts posts={posts}/>



</div>



           </div>






        </div>
        </Layout>
    );
}

export default Main;



