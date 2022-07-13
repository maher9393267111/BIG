import React from "react";
import { useState, useEffect } from "react";
import { userChats } from "../../utils/db";
import Link from "next/link";
import { useAuth } from "../../context/index";

const ChatsBar = () => {
  const [AllChats, setAllChats] = useState([]);

  const { userinfo } = useAuth();

  const onotheruserdata = () => {
    AllChats.map((chat) => {
      return (
        <div>
          <div>
            {chat.usersData
              .filter((user) => {
                user !== userinfo.id;
              })
              .map((user) => {
                return (
                  <div>
                    <h1>{user?.length}</h1>
                  </div>
                );
              })}
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    userChats(userinfo.email).then(async (res) => {
      console.log("chatsBar  ---->", res);
      setAllChats(res);
    });
  }, [userinfo]);

  return (
    <div>
      <div>{onotheruserdata()}</div>

      <div>
        {AllChats.map((chat) => {
         
          return chat.usersData
            .filter((user) => {
              return user.id !== userinfo.id;
            })
            .map((user) => {
              return (
                <div key={chat.id} className="my-4 cursor-pointer">
                  <Link href={`/chat?chatid=${chat?.id}`}>
                    <div>
                      <div className="flex">
                        {/* ---image---- */}
                        <div>
                          <img
                            className="w-12 h-12 rounded-full"
                            src={user?.image}
                            alt=""
                          />
                        </div>

                        <div className="mt-[10px] ml-4 font-bold text-blue-500">
                          <h1 className="text-blue-500">{user?.name}</h1>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            });
        })}
      </div>

      <div></div>
    </div>
  );
};

export default ChatsBar;
