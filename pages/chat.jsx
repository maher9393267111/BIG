import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollectionData,
  useDocumentData} from "react-firebase-hooks/firestore";
import { query, orderBy, collection, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { IoChatbubblesOutline } from "react-icons/io5";
import MessageInput from "../components/chat/messageInput";
const Chat = () => {


    const [user] = useAuthState(auth);
    const router = useRouter();
    const { id } = router.query;
    const bottomOfChat = useRef(null);
  
    const q = query(
      collection(db, "chats", id, "messages"),
      orderBy("timestamp")
    );
    const [messages, loading] = useCollectionData(q);
    const [chat] = useDocumentData(doc(db, "chats", id));
  
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
           


<MessageInput user={userinfo} chatId={id} />



        </div>
    );
}

export default Chat;
