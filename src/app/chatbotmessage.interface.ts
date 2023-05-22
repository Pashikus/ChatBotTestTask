export interface Chatbotmessage {
  id: number;
  sender: number; // 1 - Admin ; 2 - user; Use type number for future if we have db
  text: string;
}
