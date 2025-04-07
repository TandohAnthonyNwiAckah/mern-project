import{ fetcher} from "@/lib/hook/fetcher";
import {MessageResponse } from "@/lib/types/message";
import { UserResponse } from "@/lib/types/user";

/// BASE URL
export const BASE_URL = 'http://localhost:5300/api';

/// MESSAGE URL
export const URL_MESSAGE =  `${BASE_URL}/messages`;

/// JOIN CHAT URL
export const URL_JOIN =  `${BASE_URL}/users`;

/// SEND MESSAGE API
export const sendMessageApi = async (username: string, text: string): Promise<MessageResponse> => {
  return fetcher(`${URL_MESSAGE}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, text }),
  });
};


/// JOIN CHAT API.
export const joinChatApi = async (username: string): Promise<UserResponse> => {
  return fetcher(`${URL_JOIN}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username}),
  });
};














