import Head from "next/head";



const NextHead = (props) => {
  return (
    <Head>
      <title>{props.title} | Audiophile</title>
      <meta name="description" content={props.metaDescription} />
      <link rel="icon" href="/audiophile.png" />
    </Head>
  );
};

export default NextHead;