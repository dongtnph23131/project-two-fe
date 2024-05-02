import { createContext, useEffect, useState } from "react";

export const ChatContext = createContext({});

const ChatProvider = (props: any) => {
  const [selectedChat, setSelectedChat] = useState([]);
  const [chats, setChats] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [selectedChatNoMess, setSelectedChatNoMess] = useState();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")!));
  }, []);
  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        user,
        setUser,
        notification,
        setNotification,
        selectedChatNoMess,
        setSelectedChatNoMess,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};
export default ChatProvider;
