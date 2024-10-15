"use client";
import { useEffect, useState } from "react";
import ChatBotResponsePage from "./chatbot-response/page";
import InputFormPage from "./input-form/page";

export interface Message {
  sender: string;
  text: string;
  isError?: boolean;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const storedMessages = sessionStorage.getItem("messages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);
  function receiveDataFromInputPage(data: Message[]) {
    setMessages(data);
  }

  return (
    <div>
      <ChatBotResponsePage messages={messages}></ChatBotResponsePage>
      <InputFormPage
        sendDataToParent={receiveDataFromInputPage}
      ></InputFormPage>
    </div>
  );
}
