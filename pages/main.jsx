import React from 'react';
import Layout from '../components/global/layout';
import NextHead from '../components/global/NextHead';
import TopicsNav from '../components/global/topicsNav';
const Mai = () => {
    return (
        <Layout>
  <NextHead
        title="Home"
        metaDescription="Audiophile is the premier store for high end headphones, earphones, speakers, and accessories. Browse our collection."
      />

<div>
    <TopicsNav />
</div>


        <div>
           <h1>main page</h1> 
        </div>
        </Layout>
    );
}

export default Mai;



