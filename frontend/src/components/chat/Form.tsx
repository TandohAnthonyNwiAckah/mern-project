'use client';

import { useState, useRef } from 'react';
import { FiSend } from "react-icons/fi";
import { CiMicrophoneOn } from "react-icons/ci";
import { RiEmojiStickerLine } from "react-icons/ri";
import { FiPaperclip } from "react-icons/fi";
import { useSWRConfig } from "swr"
import { sendMessageApi, URL_MESSAGE } from '@/lib/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"





const Form = ({
  username,
  messagesEndRef
}: {
  username: string;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate } = useSWRConfig()

  // Add this state to manage the dialog
  const [dialogMessage, setDialogMessage] = useState<string | null>(null);

  /// Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      try {

        const res = await sendMessageApi(username, message);

        /// At least 5 users to initialize the chat
        if (res.code == 405) {
          // console.log('Error: ', res.message);

          setDialogMessage(res.message);
        }

        /// User not found
        if (res.code == 403) {
          // console.log('Error: ', res.message);
          setDialogMessage(res.message);
        }

        setMessage('');
        inputRef.current?.focus();
        mutate(`${URL_MESSAGE}`)
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };

  return (

    <>

      {/* Message */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm"
      >
        <button type="button" className="text-gray-500 hover:text-gray-700">
          <RiEmojiStickerLine className="text-xl" />
        </button>
        <button type="button" className="text-gray-500 hover:text-gray-700">
          <FiPaperclip className="text-xl" />
        </button>

        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 px-3 py-2 focus:outline-none"
        />

        {message ? (
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-500 focus:outline-none"
          >
            <FiSend className="text-xl" />
          </button>
        ) : (
          <button type="button" className="text-gray-500 hover:text-gray-700">
            <CiMicrophoneOn className="text-xl" />
          </button>
        )}
      </form>

      {/* Dialog Component */}
      {dialogMessage && (

        <Dialog open={!!dialogMessage} onOpenChange={() => setDialogMessage(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>XupChat</DialogTitle>
              <DialogDescription>{dialogMessage}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>


      )}


    </>
  );
};



export default Form;