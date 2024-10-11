import chatBotImg from "@/app/icon.svg";
import { getServerSideProps } from "next/dist/build/templates/pages";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import { Message } from "../page";

type Props = Awaited<ReturnType<typeof getServerSideProps>>["props"];

export default function ChatBotResponsePage({ messages }: Props) {
  const renderMessage = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/); // Split the message on **bold** parts
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        // Remove the surrounding ** and render as bold
        return (
          <strong key={index}>{part.substring(2, part?.length - 2)}</strong>
        );
      }
      return part; // Normal text part
    });
  };

  return (
    <div className="min-h-96 bg-violet-100 p-2 m-2">
      <div className="flex flex-col items-center w-full">
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
                    <FaUserCircle className="text-violet-500 text-xl" />
                  ) : (
                    <RiRobot2Line className="text-green-500 text-xl" />
                  )}
                  <div
                    className={`p-2 rounded-lg max-w-lg bg-white ${
                      msg.sender === "user"
                        ? " text-violet-700"
                        : " text-green-700"
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
            <div className="text-lg font-medium opacity-50">
              {/* Enter the city name to get the weather details. */}
              Next.js 14 using Web Socket and Google Gemini API
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
