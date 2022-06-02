import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, usernameSelector } from "../../redux/store";
import io from "socket.io-client";

import ChatMessages from "../ChatMessages/ChatMessages";

import "./ChatPanel.css";

export default function ChatPanel() {
  const [socket, setSocket] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const username = useSelector(usernameSelector);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3001`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    const messageListener = (message) => {
      dispatch(addMessage(message));
    };

    socket.on("message", messageListener);

    return () => {
      socket.off("message", messageListener);
    };
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();

    const messageObj = {
      username,
      text: newMessage,
      timestamp: Date.now(),
    };
    dispatch(addMessage(messageObj));
    socket.emit("message", messageObj);
    setNewMessage("");
  };

  return (
    <main className="panel chat-panel">
      <h1>Socket Chat!</h1>
      <ChatMessages />
      <form onSubmit={sendMessage}>
        <div className="form-row">
          <span className="reminder">{username}:</span>
          <input
            ref={inputRef}
            type="text"
            maxLength={255}
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
          />
          <button type="submit" disabled={!newMessage || !socket}>
            Send
          </button>
        </div>
      </form>
    </main>
  );
}
