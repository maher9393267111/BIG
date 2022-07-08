import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { wrapper } from "../store/index";
import Context from '../context/index'
import React, {useState, useEffect} from 'react';
import { ChakraProvider } from '@chakra-ui/react'
function MyApp({ Component, pageProps }) {

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);  

  if (isSSR) return null;



  return (
    <React.Fragment>

    <ChakraProvider>
    
    
    <Context>
    
      {/* <Layout>  */}
      <ToastContainer/>
    
    <Component {...pageProps} />
    
      {/* </Layout> */}
   
    </Context>
    
    </ChakraProvider>
    </React.Fragment>
  )
}

export default wrapper.withRedux( MyApp);
