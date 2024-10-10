"use client";
import { useState } from "react";
import ChatBotResponsePage from "./chatbot-response/page";
import InputFormPage from "./input-form/page";

interface Message {
  sender: string;
  text: string;
  isError?: boolean;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);

  function receiveDataFromInputPage(data: any) {
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
