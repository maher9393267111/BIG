import { useEffect, useRef,useState } from "react";
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
import { findOnotherUserData} from '../utils/db'
import { useAuth } from "../context/index";
import  MessageBubble  from "../components/chat/MessageBubble";
const Chat = ({chat}) => {


    const {userinfo} = useAuth();
    const [user] = useAuthState(auth);
    const router = useRouter();
    const { chatid } = router.query;
    const bottomOfChat = useRef(null);
    const [onotherdata, setOnotherdata] = useState({});
  
    const q = query(
        collection(db, "chats", chat.id, "messages"),
        orderBy("timestamp")
      );
      const [messages, loading] = useCollectionData(q);
//console.log('onononononon--->',ono);

  
    const getOtherUser = async() => {
     
// find user where not auth user in chat users array
const is = chat.users.find(user1 => user1 !== userinfo?.email);

       console.log('is---🔵🔵🔵>',is);
      // return is
    await  findOnotherUserData(is).then((onotherdata) => {
            
            setOnotherdata(onotherdata)
            console.log('onotherdata🔥🔥🔥🔥--->',onotherdata);
        })    
    };
   
// chatusers find the other user in the chat and find it in users collection his info show

useEffect(() => {

    getOtherUser()

    

}, [chatid]);




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
           
{/* ----onother user info in header show---- */}

<div className="flex gap-6">

<div className="my-6 mx-6">

{/* -his image-- */}

<div>
    <p>
        <img className="w-20 h-20 rounded-full" src={onotherdata?.image} alt="" />
    </p>

</div>


</div>



{/* --user name--- */}
<div className="mt-12 ">
    <p className="text-2xl font-bold">{onotherdata?.name}
    <span className={ `inline-block mx-4 dot ${onotherdata.isOnline ? '  bg-green-500' : ' bg-red-500'}`}></span>
    </p>
</div>



</div>


{/* --messages--- */}

<div>
{messages?.map((msg, index) => (
                <MessageBubble
                  user={user}
                  message={msg}
                  key={index}
                  numberOfMessages={messages?.length}
                  currentMessageIndex={index}
                />
              ))}
              <div ref={bottomOfChat} className="py-8"></div>
            </div>




<div className=" fixed bottom-2 right-0 left-0">



<MessageInput user={userinfo} chatId={chat.id} />

</div>

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
