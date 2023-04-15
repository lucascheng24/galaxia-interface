import React, { useEffect, useState, useRef } from "react";
import SockJsClient from "react-stomp";

import { v4 as uuidv4 } from "uuid";

interface ChatMessage {
  senderName: string;
  receiverName?: string;
  message: string;
  status: "JOIN" | "MESSAGE";
}

interface Props {
  url: string;
  headers?: any;
}

const ReactStompWithHeaders: React.FC<Props> = ({ url, headers }) => {
  const [privateChats, setPrivateChats] = useState<Map<string, ChatMessage[]>>(
    new Map()
  );
  const [publicChats, setPublicChats] = useState<ChatMessage[]>([]);
  const [tab, setTab] = useState<string>("CHATROOM");
  const [username, setUsername] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const clientRef = useRef<any>(null);

  // const clientRef = useRef<React.RefObject<any>>(null);

  useEffect(() => {
    console.log({ username, connected, message });
  }, [username, connected, message]);

  const onConnected = () => {
    setConnected(true);
    userJoin();
  };

  const userJoin = () => {
    const chatMessage: ChatMessage = {
      senderName: username,
      status: "JOIN",
      message: `${username} joined the chat room.`,
    };
    clientRef.current.sendMessage(
      "/app/chat.join",
      JSON.stringify(chatMessage)
    );
  };

  const onMessageReceived = (payload: any) => {
    const message: ChatMessage = JSON.parse(payload.body);
    if (message.status === "JOIN") {
      if (!privateChats.has(message.senderName)) {
        privateChats.set(message.senderName, []);
      }
      privateChats.get(message.senderName)?.push(message);
      setPrivateChats(new Map(privateChats));
    } else {
      setPublicChats([...publicChats, message]);
    }
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      const chatMessage: ChatMessage = {
        senderName: username,
        message,
        status: "MESSAGE",
      };
      if (tab === "CHATROOM") {
        clientRef.current.sendMessage(
          "/app/chat.sendMessage",
          JSON.stringify(chatMessage)
        );
      } else {
        chatMessage.receiverName = tab;
        if (!privateChats.has(chatMessage.receiverName)) {
          privateChats.set(chatMessage.receiverName, []);
        }
        privateChats.get(chatMessage.receiverName)?.push(chatMessage);
        setPrivateChats(new Map(privateChats));
        clientRef.current.sendMessage(
          "/app/chat.privateMessage",
          JSON.stringify(chatMessage)
        );
      }
      setMessage("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const handleTabChange = (tab: string) => {
    setTab(tab);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const headerHandler = () => headers;

  const uuid = uuidv4();

  return (
    <div>
      {!connected && (
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={handleUsernameChange}
          />
          <button onClick={onConnected}>Connect</button>
        </div>
      )}
      {connected && (
        <div>
          <div>
            <h2>Chat Room</h2>
            <div>
              {publicChats.map((chat, index) => (
                <div key={index}>
                  {chat.senderName}: {chat.message}
                </div>
              ))}
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter message"
                value={message}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
          <div>
            <h2>Private Messages</h2>
            <ul>
              {[...privateChats.keys()].map((user) => (
                <li
                  key={user}
                  onClick={() => handleTabChange(user)}
                  className={tab === user ? "active" : ""}
                >
                  {user}
                </li>
              ))}
            </ul>
            <div>
              {privateChats.has(tab) &&
                privateChats.get(tab)?.map((chat, index) => (
                  <div key={index}>
                    {chat.senderName === username ? "You" : chat.senderName}:{" "}
                    {chat.message}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      {connected && (
        <SockJsClient
          url={url}
          topics={["/topic/public", `/topic/private.${uuid}.${username}`]}
          onConnect={onConnected}
          onMessage={onMessageReceived}
          headers={headerHandler}
          ref={(client: any) => (clientRef.current = client)}
        />
      )}
    </div>
  );
};
export default ReactStompWithHeaders;
