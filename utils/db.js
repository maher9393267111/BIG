
import {
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    onSnapshot,
    orderBy,
    limit,
    query,
    where,
    FieldPath,
    updateDoc,
    arrayUnion,
    addDoc,
    deleteDoc,
    serverTimestamp
} from "firebase/firestore";

import {
    getDownloadURL,
    ref,
    uploadString,
    getStorage,
    uploadBytes,
    deleteObject,
  } from "firebase/storage";


import { db,storage } from '../firebase'
import {
    useCollectionData,
    useDocumentData,
  } from "react-firebase-hooks/firestore";
import { toast } from "react-toastify";





export const createPost = async (postdata) => {

    console.log('subdata--->⚡⚡');
    await addDoc(collection(db, "InstaPosts",), postdata).then(() => {
        toast.success("post created successfully");

    }
    ).catch((error) => {
        toast.error(error.message);


    }
    );
}





export const AllPosts= () => {
    return getDocs(query(collection(db, "InstaPosts"),    
   // orderBy('orderby', "desc")
    )).then((querySnapshot) => {
  
      var data = [];
      querySnapshot.forEach((doc) => {
     
          console.log("posts is exist");
          
          data.push({ ...doc.data(),id: doc.id  })
        
      });
    //  setProductsNew(data);
  console.log("Posts------>",data);
      return  data;
    });
  }



  

export const PostsByTopic= (topic) => {
    return getDocs(query(collection(db, "InstaPosts"), 
    where("topic", "==", topic)   
   // orderBy('orderby', "desc")
    )).then((querySnapshot) => {
  
      var data = [];
      querySnapshot.forEach((doc) => {
     
          console.log("posts is exist");
          
          data.push({ ...doc.data(),id: doc.id  })
        
      });
    //  setProductsNew(data);
  console.log("Posts by specefic Topic------>",data);
      return  data;
    });
  }



  
export const userPosts= (userName) => {
  return getDocs(query(collection(db, "posts"), 
  where("postedby", "==", userName)   
 // orderBy('orderby', "desc")
  )).then((querySnapshot) => {

    var data = [];
    querySnapshot.forEach((doc) => {
   
        console.log("user posts is exist");
        
        data.push({ ...doc.data(),id: doc.id  })
      
    });
  //  setProductsNew(data);
console.log("specefic user Posts----->",data);
    return  data;
  });
}


// userLikesPosts


export const userLikesPosts= (userName) => {
  return getDocs(query(collection(db, "posts"), 
  where("postedby", "==", userName)   
 // orderBy('orderby', "desc")
  )).then((querySnapshot) => {

    var data = [];
    querySnapshot.forEach((doc) => {
   
        console.log("user posts is exist");
        
        data.push({ ...doc.data(),id: doc.id  })
      
    });
  //  setProductsNew(data);
console.log("specefic user Posts----->",data);
    return  data;
  });
}







export const AllUsers= (user) => {
 // console.log("user is 📍  📍  📍 ------>",user?.name);
   
  return getDocs(query(collection(db, "users"),  
  //  all users except auth user
    user?.name !== undefined ? where("name", "!=", user?.name) : where("name", "!=", "")
 // orderBy('orderby', "desc")
  )).then((querySnapshot) => {

    var data = [];
    querySnapshot.forEach((doc) => {
   
        console.log("users is exist");
        
        data.push({ ...doc.data(),id: doc.id  })
      
    });
  //  setProductsNew(data);
console.log("allUSers ------>",data);
    return  data;
  });
}




// handle useschat


export const handleChatusers= async(id) => {
  const userpath = doc(db, "users", `${id}`);
  const useris = await (await getDoc(userpath)).data();
  console.log("useris☢️☢️☢️☢️------>",useris,'id:::::',id);
  return useris;

}



// find if me or  nother user have chat with each other

export const ExistChat= (me,user) => {
  // console.log("user is 📍  📍  📍 ------>",user?.name);
    
   return getDocs(query(collection(db, "chats"),  
   

   )).then((querySnapshot) => {
 
     var data = [];
     querySnapshot.forEach((doc) => {
    
         console.log("users is exist");
         
         data.push({ ...doc.data(),id: doc.id  })
       
     });
   //  setProductsNew(data);
 console.log("Are we have Chat ???????? ------>",data);


// the find chat between me and other user
  var chat = data.find(chat => chat.users.includes(me) && chat.users.includes(user));
  console.log("chat is ------>",chat);
  return chat;

   //  return  data;
   });
 }
 