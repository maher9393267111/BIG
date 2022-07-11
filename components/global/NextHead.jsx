import Head from "next/head";



const NextHead = (props) => {
  return (
    <Head>
      <title>{props.title} | Audiophile</title>
      <meta name="description" content={props.metaDescription} />
      <link rel="icon" href="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_instagram-256.png" />
    </Head>
  );
};

export default NextHead;