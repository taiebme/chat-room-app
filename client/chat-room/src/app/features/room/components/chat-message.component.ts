import {Component, Input} from "@angular/core";
import {ChatMessage, User} from "../../../models";


@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent {
  @Input() chatMessage: ChatMessage;
  @Input() activeUser: User;

  constructor() {
  }
}
