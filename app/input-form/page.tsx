"use client";
import { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { socket } from "../socket";

export default function InputFormPage({ sendDataToParent }: any) {
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("response", (reply) => {
      console.log("Received response:", reply);
      const newBotMessage = { sender: "bot", text: reply };
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newBotMessage];
        sendDataToParent(updatedMessages);
        return updatedMessages;
      });
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("response");
    };
  }, [sendDataToParent]);

  const sendMessage = () => {
    if (!inputVal) return;
    const newUserMessage = { sender: "user", text: inputVal };
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newUserMessage];
      sendDataToParent(updatedMessages);
      return updatedMessages;
    });

    if (socket && isConnected) {
      console.log("Socket is connected, sending message...");
      socket.emit("message", inputVal);
    } else {
      console.error("Socket is not initialized or not connected");
    }
    setInputVal("");
  };

  return (
    <>
      <div className="w-auto flex justify-stretch items-center p-2 bg-slate-200 m-2 rounded">
        <input
          type="text"
          className="flex-grow p-2 border border-transparent rounded focus:outline-none focus:ring-0 focus:border-gray-500"
          placeholder="Ask the chatBot here.."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        {inputVal && isConnected && (
          <IoMdSend
            className="text-gray-600 size-8 mx-2 cursor-pointer"
            onClick={() => sendMessage()}
          />
        )}
      </div>
      <div></div>
    </>
  );
}
