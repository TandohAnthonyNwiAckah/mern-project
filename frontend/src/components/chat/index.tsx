'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Message } from '@/lib/types/message';
import { fetcherGet } from '@/lib/hook/fetcher';
import useSWR from 'swr';
import { URL_MESSAGE } from '@/lib/api';
import Header from '@/components/chat/Header';
import Form from '@/components/chat/Form';
import Content from '@/components/chat/Content';
import Sidebar from '@/components/chat/Sidebar'; // Import the Sidebar component
import SkeletonLoader from '@/components/chat/SkeletonLoader';

const Index = ({ id }: { id: string }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const { data, error, isLoading } = useSWR(`${URL_MESSAGE}`, fetcherGet, {
    refreshInterval: 5000,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // Scroll to the last message whenever `data?.messages` changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data?.messages]);


  /// Handle error
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Error loading messages</div>
      </div>
    );


  /// Handle loading
  if (isLoading) return <SkeletonLoader />;


  return (
    <div className="flex h-screen bg-[#e5ddd5] bg-opacity-30 bg-[url('/chat_bg.jpg')]">


      {/* Sidebar */}
      <Sidebar
        isVisible={isSidebarVisible}
        onClose={() => setIsSidebarVisible(false)}
      />

      {/* Main chat area */}
      <div className={`flex flex-col ${isSidebarVisible ? 'flex-1' : 'w-full'}`}>

        {/* Header */}
        <Header onToggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)} />

        {/* Main content area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {!isSidebarVisible && (
            <button
              onClick={() => setIsSidebarVisible(true)}
              className="mb-4 text-gray-500 hover:text-gray-700"
            >
              {/* Show Sidebar */}
            </button>
          )}
          {data?.messages?.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <div className="text-gray-500">No messages yet. Say hello!</div>
            </div>
          ) : (
            <>
              <div className="text-center my-4">
                <span className="bg-white px-3 py-1 rounded-full text-xs text-gray-500 shadow-sm">
                  Today
                </span>
              </div>
              {data?.messages?.map((msg: Message) => (
                <Content
                  key={msg._id}
                  message={msg}
                  isCurrentUser={msg.username === id}
                />
              ))}
              {/* Ref for the last message */}
              <div ref={messagesEndRef}></div>
            </>
          )}
        </div>

        {/* Input Form */}
        <div className="bg-gray-100 p-3 border-t border-gray-300">
          <Form username={id} messagesEndRef={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default Index;