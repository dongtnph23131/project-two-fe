import { ChatContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { socket } from "@/socket";
const SingleChat = ({ setFetchAgain, fetchAgain }: any) => {
  const {
    selectedChat,
    setSelectedChat,
    notification,
    setNotification,
    selectedChatNoMess,
  }: any = useContext(ChatContext);
  const [user, _] = useState(JSON.parse(localStorage.getItem("user")!));
  const [value, setValue] = useState("");
  const { toast } = useToast();
  useEffect(() => {
    socket.on("connected");
    socket.emit("setup", user);
    if (!selectedChat) return;
    socket.emit("join chat", selectedChat[0]?.chatId?._id);
  }, [selectedChat]);
  const token = JSON.parse(localStorage.getItem("token")!);
  const sendMessage = async () => {
    if (!value) {
      toast({
        variant: "destructive",
        title: "Tin nhắn trống",
      });
      return;
    }
    try {
      let response;
      if (selectedChat?.length > 0) {
        response = await axios.post(
          `http://localhost:8080/api/v1/send-message`,
          { content: value, chatId: selectedChat[0]?.chatId?._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.post(
          `http://localhost:8080/api/v1/send-message`,
          { content: value, chatId: selectedChatNoMess?._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      socket.emit("new message", response?.data);
      setSelectedChat([...selectedChat, response?.data]);
      setValue("");
      setFetchAgain(!fetchAgain);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    }
  };
  useEffect(() => {
   
    socket.on("message recieved", (newMessageRecieved: any) => {
      if (selectedChat?.length > 0) {  
        setSelectedChat([...selectedChat, newMessageRecieved]);
      } else {
        setFetchAgain(!fetchAgain);
        setNotification([...notification, newMessageRecieved]);
      }
    });
  });
  return (
    <>
      {selectedChat?.length > 0 ? (
        <div className="w-full">
          <div className="flex-1">
            <header className="bg-white p-4 text-gray-700">
              <h1 className="text-2xl font-semibold">
                {selectedChat
                  ? selectedChat[0]?.chatId?.users?.filter((item: any) => {
                      return item?._id !== user?._id;
                    })[0]?.name
                  : ""}
              </h1>
            </header>
            <div className="h-[400px] overflow-y-auto p-4 pb-36">
              {selectedChat?.map((item: any, index: any) => {
                if (item?.sender?._id !== user?._id) {
                  return (
                    <div key={index + 1} className="flex mb-4 cursor-pointer">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                        <img
                          src={item?.sender?.avatar}
                          alt="User Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                      <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                        <p className="text-gray-700">{item?.content}</p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index + 1}
                      className="flex justify-end mb-4 cursor-pointer"
                    >
                      <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                        <p>{item?.content}</p>
                      </div>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                        <img
                          src={item?.sender?.avatar}
                          alt="My Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <footer className="bg-white border-t border-gray-300 p-4 bottom-0 w-full">
              <div className="flex items-center">
                <input
                  type="text"
                  onChange={(e: any) => setValue(e.target.value)}
                  value={value}
                  placeholder="Type a message..."
                  className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={sendMessage}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
                >
                  Send
                </button>
              </div>
            </footer>
          </div>
        </div>
      ) : (
        <>
          {selectedChatNoMess ? (
            <div className="w-full">
              <div className="flex-1">
                <header className="bg-white p-4 text-gray-700">
                  <h1 className="text-2xl font-semibold">
                    {selectedChatNoMess
                      ? selectedChatNoMess?.users?.filter((item: any) => {
                          return item?._id !== user?._id;
                        })[0]?.name
                      : ""}
                  </h1>
                </header>
                <div className="h-[400px] overflow-y-auto p-4 pb-36"></div>
                <footer className="bg-white border-t border-gray-300 p-4 bottom-0 w-full">
                  <div className="flex items-center">
                    <input
                      type="text"
                      onChange={(e: any) => setValue(e.target.value)}
                      value={value}
                      placeholder="Type a message..."
                      className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={sendMessage}
                      className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
                    >
                      Send
                    </button>
                  </div>
                </footer>
              </div>
            </div>
          ) : (
            <div className="text-2xl px-3 py-3">
              Mời bạn chọn bạn bè để trò chuyện
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SingleChat;
