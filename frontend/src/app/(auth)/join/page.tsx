import JoinForm from "@/components/user/Join";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Chat",
};

const Page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f1f7fd] px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-blue-500 p-6 text-white">
          <h1 className="text-2xl font-bold">XupChat</h1>
          <p className="text-sm opacity-90">Join the chat room</p>
        </div>

        <div className="p-6">
          <JoinForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
