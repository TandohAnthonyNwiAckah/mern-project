export interface Message {
  _id: string;
  username: string;
  text: string;
  timestamp: string;

}



export type MessageResponse = {
  messages: Message[];
  message: string;
  code: number;
};
