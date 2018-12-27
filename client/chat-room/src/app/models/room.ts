import {ChatMessage} from "./chatMessage";
import {User} from "./user";

export class Room {

  constructor() {
    this.messages = [];
    this.users = [];
  }

  id: number;
  name: string;
  messages?: ChatMessage[];
  users?: User[]
}
