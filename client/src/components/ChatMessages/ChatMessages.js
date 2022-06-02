import { useSelector } from "react-redux";
import { messagesSelector } from "../../redux/store";

import "./ChatMessages.css";

export default function ChatMessages() {
  const messageList = useSelector(messagesSelector);

  return <section className="chat-messages">
	  {messageList.map(message => {
		  return <div key={message.timestamp} className="message-line" title={new Date(message.timestamp)}>
		  <div className="message-line__user">{message.username}:</div>
		  <div>{message.text}</div>
	  </div>
	  })}
  </section>;
}
