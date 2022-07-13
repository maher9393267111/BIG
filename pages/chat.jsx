import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollectionData,
  useDocumentData} from "react-firebase-hooks/firestore";
import { query, orderBy, collection, doc,getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { IoChatbubblesOutline } from "react-icons/io5";
import MessageInput from "../components/chat/messageInput";
import safeJsonStringify from "safe-json-stringify";
const Chat = ({chat}) => {


    const [user] = useAuthState(auth);
    const router = useRouter();
  //  const { chatid } = router.query;
    const bottomOfChat = useRef(null);
  
    const q = query(
        collection(db, "chats", chat.id, "messages"),
        orderBy("timestamp")
      );
      const [messages, loading] = useCollectionData(q);


  
    const getOtherUser = (users, currentUser) => {
      return users?.filter((user) => user !== currentUser.email);
    };
   

    useEffect(() => {
        setTimeout(
          bottomOfChat?.current?.scrollIntoView({
            behavior: "auto",
            block: "start",
          }),
          10
        );
      }, [messages]);




    return (
        <div>
           


<MessageInput user={user} chatId={chat.id} />



        </div>
    );
}

export default Chat;






export async function getServerSideProps(context) {

    const chatid = context.query.chatid 


    console.log("id--->",chatid);
    const snapshot = await getDoc(doc(db, "chats", chatid));
    
  
    const chatdata = snapshot.data();
  

    if (!chatdata) {
      return {
        notFound: true,
      };
    }
  
     chatdata.id = snapshot.id;
  
  //  strignfy the data
    const chat = JSON.parse(
      safeJsonStringify({ id: snapshot.id, ...snapshot.data() }) // needed for dates
    );
     
  



  

    return {
      props: { chat: chat },
    };
  }
