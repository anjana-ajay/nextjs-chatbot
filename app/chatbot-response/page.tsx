'use client';
import chatBotImg from "@/app/icon.svg";
import { getServerSideProps } from "next/dist/build/templates/pages";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import { Message } from "../page";
import { useEffect } from "react";
import React from "react";

type Props = Awaited<ReturnType<typeof getServerSideProps>>["props"];

export default function ChatBotResponsePage({ messages }: Props) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const element = document.getElementById("box");
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    }
  }, [messages]);

  const renderMessage = (text: string): JSX.Element => {
    if (typeof text !== "string") {
      return <span key="invalid">Invalid input</span>; // Return as is if not a string
    }

    return (
      <div>
        {text.split("\n").map((line, lineIndex) => (
          <span key={lineIndex}>
            {renderLineContent(line)}
            <br />
          </span>
        ))}
      </div>
    );
  };

  const renderLineContent = (line: string): (string | JSX.Element)[] => {
    const boldPattern = /\*\*(.*?)\*\*/g;
    const urlPattern = /\((https?:\/\/[^\s]+)\)/g;

    return line.split(boldPattern).flatMap((part, index) =>
      part.split(urlPattern).flatMap((urlPart, urlIndex) => {
        const isBold = index % 2 === 1; // Determine if the part is bold

        return urlIndex % 2 === 1 ? (
          <span key={`${index}-${urlIndex}`}>
            (
            <a
              style={{ color: "blue", textDecoration: "underline" }}
              href={urlPart}
              target="_blank"
              rel="noopener noreferrer"
            >
              {urlPart}
            </a>
            )
          </span>
        ) : isBold ? (
          <strong key={urlIndex}>{urlPart}</strong>
        ) : (
          urlPart
        );
      })
    );
  };

  return (
    <div className="h-96 overflow-auto bg-gray-50 shadow-md p-2 m-2" id="box">
      <div className="flex flex-col items-center w-full px-4">
        {messages?.length > 0 ? (
          <div className="w-full flex flex-col space-y-2">
            {messages.map((msg: Message, index: number) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-start space-x-2">
                  {msg.sender === "user" ? (
                    <FaUserCircle className="text-blue-600 text-xl" />
                  ) : (
                    <RiRobot2Line className="text-gray-600 text-xl" />
                  )}
                  <div
                    className={`p-3 rounded-lg max-w-lg bg-white shadow-sm ${
                      msg.sender === "user"
                        ? "text-blue-700 border border-blue-300"
                        : "text-gray-700 border border-gray-300"
                    }`}
                  >
                    {renderMessage(msg.text)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center m-20">
            <Image
              src={chatBotImg}
              className="rounded-full bg-white p-3"
              alt="chat bot icon"
              height={100}
              width={100}
              priority
            />
            <br />

            <div className="text-lg font-medium text-gray-500">
              Next.js 14 using Web Socket and Google Gemini API
            </div>
          </div>
        )}
      </div>
    </div>

    // <div
    //   className="h-96 overflow-auto bg-gray-50 p-4 m-2 rounded shadow-md"
    //   id="box"
    // >
    //   <div className="flex flex-col items-center w-full px-4">
    //     {messages?.length > 0 ? (
    //       <div className="w-full flex flex-col space-y-3">
    //         {messages.map((msg: Message, index: number) => (
    //           <div
    //             key={index}
    //             className={`flex ${
    //               msg.sender === "user" ? "justify-end" : "justify-start"
    //             }`}
    //           >
    //             <div className="flex items-start space-x-2">
    //               {msg.sender === "user" ? (
    //                 <FaUserCircle className="text-blue-600 text-xl" />
    //               ) : (
    //                 <RiRobot2Line className="text-gray-600 text-xl" />
    //               )}
    //               <div
    //                 className={`p-3 rounded-lg max-w-lg bg-white shadow-sm ${
    //                   msg.sender === "user"
    //                     ? "text-blue-700 border border-blue-300"
    //                     : "text-gray-700 border border-gray-300"
    //                 }`}
    //               >
    //                 {renderMessage(msg.text)}
    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     ) : (
    //       <div className="flex flex-col items-center justify-center text-center m-20">
    //         <Image
    //           src={chatBotImg}
    //           className="rounded-full bg-white p-3 shadow-lg"
    //           alt="chat bot icon"
    //           height={100}
    //           width={100}
    //           priority
    //         />
    //         <br />
    //         <div className="text-lg font-medium text-gray-500">
    //           Next.js 14 using Web Socket and Google Gemini API
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
}
