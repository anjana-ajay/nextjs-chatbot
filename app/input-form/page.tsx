"use client";
import { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";
import { socket } from "../socket";
import { getServerSideProps } from "next/dist/build/templates/pages";
import { Message } from "../page";

type Props = Awaited<ReturnType<typeof getServerSideProps>>["props"];
export default function InputFormPage({ sendDataToParent }: Props) {
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedMessages = sessionStorage.getItem("messages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

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
      setIsLoading(false);
      console.log("Received response:", reply);
      const newBotMessage = { sender: "bot", text: reply };
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newBotMessage];
        sessionStorage.setItem("messages", JSON.stringify(updatedMessages));
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
      setIsLoading(true);
      const updatedMessages = [...prevMessages, newUserMessage];
      sessionStorage.setItem("messages", JSON.stringify(updatedMessages));
      sendDataToParent(updatedMessages);
      return updatedMessages;
    });
    console.log("messages=", messages);

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
        {isLoading && (
          <FaSpinner
            className="text-gray-600 size-8 mx-2"
            style={{ animation: "spin 1s linear infinite" }}
          />
        )}
      </div>
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div></div>
    </>
  );
}
