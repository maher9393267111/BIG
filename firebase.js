
import { initializeApp,getApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics, logEvent } from "firebase/analytics"
//import firebase from "firebase/app";
const firebaseConfig =  initializeApp({
   

// apiKey: "AIzaSyBI7p9VcmEmdtogk3GqjUNIrz_kNT1u14g",
// authDomain: "precise-reality-324621.firebaseapp.com",
// databaseURL: "https://precise-reality-324621-default-rtdb.firebaseio.com",
// projectId: "precise-reality-324621",
// storageBucket: "precise-reality-324621.appspot.com",
// messagingSenderId: "671790327953",
// appId: "1:671790327953:web:8e0f22b2ea69d2cc347730",
// measurementId: "G-TBEJLSK4SL"

apiKey: "AIzaSyD_Eub_0yK8fx_ZuWvLTFu6S2bgVoYeB7M",
authDomain: "mern-4dbe9.firebaseapp.com",
projectId: "mern-4dbe9",
storageBucket: "mern-4dbe9.appspot.com",
messagingSenderId: "455005923505",
appId: "1:455005923505:web:e91b064422d11f2222da90"





});


let firebaseApp;
try {
    firebaseApp = getApp();
    console.log(
        'firebaseApp',
    )
} catch (e) {
  firebaseApp = initializeApp(firebaseConfig);
  console.log('firebaseApp', firebaseApp);
}



// Initialize Firebase
//export const app = initializeApp(firebaseConfig);
export const app = firebaseApp
export const storage = getStorage(app);
export const db = getFirestore();
export const auth = getAuth();



export const analytics = () => {
  if (typeof window !== "undefined") {
   //  return firebase.analytics()
    return getAnalytics(app)
  } else {
     return null
  }
}



 //export  const analytics = getAnalytics(app);


export {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
}