
import { lusitana } from "@/lib/font/fonts";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";


export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      < HiOutlineChatBubbleLeftRight className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">XupChat</p>
    </div>
  );
}
