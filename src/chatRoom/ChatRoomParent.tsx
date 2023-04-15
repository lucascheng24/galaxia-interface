import React from "react";
import ReactStompWithHeaders from "./ChatroomWithHeader";
import { useAuth } from "../auth/UserProfileContext";

const ChatRoomParentComponent = () => {
  const { userProfile } = useAuth();

  const headers = {
    Authorization: "Bearer " + userProfile?.token,
    'Access-Control-Allow-Credentials': true
  };
  const url = "http://localhost:8080/ws";

  return (
    <div>
      <h1>My App</h1>
      <ReactStompWithHeaders url={url} headers={headers} />
    </div>
  );
};

export default ChatRoomParentComponent;
