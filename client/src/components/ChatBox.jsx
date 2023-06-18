import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import io from "socket.io-client";
import { AuthContext } from "../context/AuthContext";

const socket = io("http://localhost:3300");

function ChatBox() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { name } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:3300/api/users")
      .then((res) => setData(res.data));

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, []);

  const handleMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = (event) => {
    event.preventDefault();

    if (name && message) {
      socket.emit("chatMessage", { name, message });
      setMessage("");
    } else {
      alert("If you want to send message, please login or register");
    }
  };

  return (
    <>
      <div
        style={{
          marginTop: "80px",
          padding: "0 2rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1>Chat</h1>
          <form onSubmit={sendMessage}>
            <label htmlFor="message" style={{ marginRight: "20px" }}>
              Message
            </label>
            <input
              type="text"
              name="message"
              id="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <br />
            <br />
            <input type="submit" value="Send message" />
          </form>

          <hr />

          <div>
            {messages.map((message, index) => (
              <div key={index}>
                <strong>{message.name}: </strong>
                {message.message}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1>All Users</h1>
          <ul style={{ listStyle: "none" }}>
            {data &&
              data.map((q, key) => (
                <li key={key} style={{ fontSize: "18px" }}>
                  {q.username}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ChatBox;
