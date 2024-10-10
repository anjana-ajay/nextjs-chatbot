import Image from "next/image";
import chatBotImg from "@/app/icon.svg";
export default function Header() {
  return (
    <div className="relative bg-violet-300 flex items-center font p-2 text-white font-extrabold h-20 text-xl rounded w-full">
      <Image
        src={chatBotImg}
        className="absolute left-6 bg-white rounded-full p-1"
        alt="chat bot icon"
        height={30}
        width={30}
        priority
      />
      <div className="mx-auto">Next ChatBot</div>
    </div>
  );
}
