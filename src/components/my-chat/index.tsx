import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../ui/input";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "@/context";
import { useToast } from "../ui/use-toast";
import axios from "axios";
const MyChat = ({ fetchAgain }: any) => {
  const [isSearch, setIsSearch] = useState(false);
  const [data, setData] = useState([]);
  const { toast } = useToast();
  const token = JSON.parse(localStorage.getItem("token")!);
  const user = JSON.parse(localStorage.getItem("user")!);
  const [lengthChat, setLengthChat] = useState();
  const {
    setSelectedChat,
    selectedChat,
    chats,
    setChats,
    notification,
    setNotification,
    setSelectedChatNoMess,
  }: any = useContext(ChatContext);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${uri_Api()}/fetchs/chat-by-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChats(response?.data);
        setLengthChat(
          response?.data?.filter((item: any) => !!item?.lastMessage).length
        );
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: error?.response?.data?.message,
        });
      }
    })();
  }, [fetchAgain]);
  return (
    <div className="w-1/2 px-5 py-5 border-r border-gray-300">
      <div className="p-4 flex justify-between items-center text-gray-500">
        <h1 className="text-2xl font-semibold">Chat Web ({lengthChat})</h1>
        <Popover>
          <PopoverTrigger onClick={() => setIsSearch(true)}>
            <svg
              fill="#000000"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21,12a1,1,0,0,0-1,1v6a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4h6a1,1,0,0,0,0-2H5A3,3,0,0,0,2,5V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12ZM6,12.76V17a1,1,0,0,0,1,1h4.24a1,1,0,0,0,.71-.29l6.92-6.93h0L21.71,8a1,1,0,0,0,0-1.42L17.47,2.29a1,1,0,0,0-1.42,0L13.23,5.12h0L6.29,12.05A1,1,0,0,0,6,12.76ZM16.76,4.41l2.83,2.83L18.17,8.66,15.34,5.83ZM8,13.17l5.93-5.93,2.83,2.83L10.83,16H8Z" />
            </svg>
          </PopoverTrigger>
          {isSearch ? (
            <PopoverContent className="w-[400px]">
              <div className="flex">
                <Input
                  onChange={async (e: any) => {
                    try {
                      if (e.target.value === "") {
                        setData([]);
                        return;
                      }
                      const response = await axios.get(
                        `${uri_Api()}/users/search-name?search=${
                          e.target.value
                        }`
                      );
                      setData(
                        response?.data.filter(
                          (item: any) => item?._id !== user?._id
                        )
                      );
                    } catch (error: any) {
                      toast({
                        variant: "destructive",
                        title: error?.response?.data?.message,
                      });
                    }
                  }}
                  placeholder="Tìm kiếm đoạn chat"
                />
              </div>
              <div className="flex items-center mx-5 my-5 cursor-pointer hover:bg-gray-100 rounded-md">
                {data?.length > 0 ? (
                  <>
                    {data?.map((item: any, index: any) => {
                      return (
                        <div
                          key={index + 1}
                          className="flex gap-5"
                          onClick={async () => {
                            const chatId = chats?.find((itemMap: any) => {
                              return itemMap?.users?.find(
                                (i: any) => i?._id === item?._id
                              );
                            });

                            try {
                              let response;
                              if (selectedChat?.length === 0) {
                                response = await axios.post(
                                  `${uri_Api()}/assess-chat`,
                                  {
                                    userId: item?._id,
                                  },
                                  {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  }
                                );
                                setSelectedChatNoMess(response?.data);
                                setIsSearch(false);
                                setData([]);
                                return;
                              } else {
                                response = await axios.get(
                                  `${uri_Api()}/get-message-by-chat-id/${
                                    chatId?._id
                                  }`,
                                  {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  }
                                );
                                setSelectedChat(response?.data);
                                setIsSearch(false);
                                setData([]);
                              }
                            } catch (error: any) {
                              toast({
                                variant: "destructive",
                                title: error?.response?.data?.message,
                              });
                            }
                          }}
                        >
                          <div className="w-12 h-12 bg-gray-300 rounded-full">
                            <img
                              src={item?.avatar}
                              alt="User Avatar"
                              className="w-12 h-12 rounded-full"
                            />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-lg font-semibold mt-2">
                              {item?.name}
                            </h2>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  ""
                )}
              </div>
            </PopoverContent>
          ) : (
            ""
          )}
        </Popover>
      </div>
      <div className="overflow-y-auto h-[400px] p-3 mb-9 pb-20">
        {chats?.map((item: any, index: any) => {
          const cssNotification = notification?.find(
            (itemNotification: any) =>
              itemNotification?.chatId?._id == item?._id
          );
          if (!item?.lastMessage) {
            return;
          }
          return (
            <div
              onClick={async () => {
                try {
                  const response = await axios.get(
                    `${uri_Api()}/get-message-by-chat-id/${item?._id}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  setSelectedChat(response?.data);
                  setNotification(
                    notification?.filter(
                      (n: any) => n?.chatId?._id !== item?._id
                    )
                  );
                } catch (error: any) {
                  toast({
                    variant: "destructive",
                    title: error?.response?.data?.message,
                  });
                }
              }}
              key={index + 1}
              className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
            >
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img
                  src={
                    item?.users?.filter(
                      (userItem: any) => userItem?._id !== user?._id
                    )[0]?.avatar
                  }
                  alt="User Avatar"
                  className="w-full h-full rounded-full"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">
                  {
                    item?.users?.filter(
                      (userItem: any) => userItem?._id !== user?._id
                    )[0]?.name
                  }
                </h2>
                <p
                  className={`${
                    cssNotification ? "text-red-500 font-bold" : "text-gray-400"
                  }`}
                >
                  {item?.lastMessage?.sender === user?._id ? "Bạn : " : ""}
                  {item?.lastMessage?.content?.substring(0, 25)} ...
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyChat;
