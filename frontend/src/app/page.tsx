import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/ui/Logo";
import { lusitana } from "@/lib/font/fonts";
import { FaArrowRightToBracket } from "react-icons/fa6";

const Page = () => {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <Logo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">

          <p
            className={`${lusitana.className} antialiased text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            <strong>Welcome to XupChat.</strong> Small groups, big conversations.{" "}
            <Link href="https://github.com/TandohAnthonyNwiAckah" className="text-blue-500">
              Download now
            </Link>
            , brought to you by Anthony Tandoh.
          </p>

          <Link
            href="/join"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Join Chat</span> <FaArrowRightToBracket className="text-xl" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">

          {/* Overview Desktop */}
          <Image
            src="/overview_web.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the project overview showing web version"
          />

          {/* Overview Mobile */}
          <Image
            src="/overview_mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshot of the project overview showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}

export default Page;