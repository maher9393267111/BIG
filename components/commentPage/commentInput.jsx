import React from "react";
import { useState, useRef, useEffect } from "react";
import { GrFormClose } from "react-icons/gr";
import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";

import { db, storage } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

import { emojis } from "../post/emojis";

const InputCommentPage = ({ 
     postid, userinfo,comment }) => {
  const filePickerRef = useRef(null);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emoji, setEmoji] = useState(emojis);
  const [showEmoji, setShowEmoji] = useState(false);

  const emojiToggle = () => {
    setShowEmoji(!showEmoji);
  };

  const selectEmoji = (emo) => {
    let prevText = input;
    setInput(prevText + emo);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(
      collection(db, "InstaPosts", postid, "comments",comment?.id, "CommentComments"),
      {
        comment: input,
        name: userinfo.name,
        userid: userinfo.id,
        postid: postid,
        replyto: comment?.name,
      
        commentid:comment?.id,

        userImg: userinfo.image,
        timestamp: serverTimestamp(),
      }
    );

    const imageRef = ref(storage, `CommentComments/${docRef.id}/image`);

    if (selectedFile) {
      // Upload image as url to storage then send it to current user's post doc as update
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "InstaPosts", postid, "comments",comment?.id,'CommentComments' ,docRef.id), {
          image: downloadURL,
        });
      });
    }

    setInput("");
    setSelectedFile(null);
    setLoading(false);
    setShowEmoji(false);
  };

  return (
    <div className="mb-20 border-t-2 border-t-slate-500 pt-6">
      <div>
        <div className=" w-full min-h-[166px]">
          {/* --header--- */}
          <div>
            <p className="text-[18px] font-semibold ">
              Replaying to <span className=" text-[#5D8BF4]">@{comment?.name}</span>{" "}
            </p>
          </div>

          {/* --auth user image and input-- */}

          <div className="mt-4 h-[160px]">
            <div className="flex gap-4">
              {/* ----auth iamge user-- */}

              <div className="">
                <img
                  className="w-20 h-20 rounded-full object-cover"
                  src={userinfo?.image}
                  alt=""
                />
                <div>
                    <p>{userinfo?.name}</p>
                </div>
              </div>

              {/* ---comment input--- */}

              <div className="flex-1">
                <div className="w-full">
                  <textarea
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    className="border-none focus:border:none focus:outline-none inline-block w-[266px] h-16 text-xl"
                    type="text"
                    placeholder="write your comment"
                  />
                </div>
              </div>
            </div>

            {selectedFile && (
              <div className=" relative">
                <GrFormClose
                  onClick={() => setSelectedFile(null)}
                  className="border  text-black absolute cursor-pointer shadow-lg border-white m-1 w-6 h-6 rounded-full"
                />
                <img
                  className={`${
                    loading && "animate-pulse"
                  } w-24 h-24 rounded-full`}
                  src={selectedFile}
                  alt=""
                />
              </div>
            )}

            <div>
              {!loading && (
                <div className="ml-16 mt-6 mb-6">
                  <div className="flex">
                    <div
                      className=""
                      onClick={() => filePickerRef.current.click()}
                    >
                      <PhotographIcon className="hoverEffect p-2 text-sky-400 hover:bg-sky-100 h-12 w-12 cursor-pointer" />
                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      />
                    </div>
                    <div className="relative">
                      <EmojiHappyIcon
                        onClick={emojiToggle}
                        className="hoverEffect p-2 text-sky-400 hover:bg-sky-100 h-12 w-12 cursor-pointer"
                      />

                      {/* -----emojis box---- */}

                      <div className="absolute top-[88px] left-[-50px] ">
                        {showEmoji && (
                          <div className=" w-[222px]  bg-white border-2-black   z-30 border-2 shadow-md    overflow-scroll scrollbar-hide  h-[230px]">
                            <div className=" grid grid-cols-9">
                              {emoji.map((emo, i) => (
                                <div key={i}>
                                  <p
                                    onClick={() => selectEmoji(emo)}
                                    className="  cursor-pointer"
                                  >
                                    {emo}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 ml-6">
                      <button
                        onClick={sendPost}
                        disabled={!input.trim()}
                        className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                        type="submit"
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                  {/* asas */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default  InputCommentPage;
