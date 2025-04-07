import Index from '@/components/chat';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Group Chat",
};


const Page = async ({ params }: PageProps) => {

  const { id } = await params;

  return (
    <div className="w-full h-screen">
      <Index id={id} />
    </div>
  );
};

export default Page;