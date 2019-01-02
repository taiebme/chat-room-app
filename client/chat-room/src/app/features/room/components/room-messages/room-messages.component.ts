import {AfterViewChecked, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ChatMessage, Room, User} from '../../../../models';
import {WebSocketService} from '../../../../services/web-socket.service';


@Component({
  selector: 'room-messages',
  templateUrl: './room-messages.component.html',
  styleUrls: ['./room-messages.component.css']
})
export class RoomMessagesComponent implements AfterViewChecked {
  @Input() room: Room;
  @Input() activeUser: User;

  @ViewChild('messagesWrapper', {read: ElementRef}) messagesWrapper: ElementRef;

  constructor(private webSocketService: WebSocketService) {
    this.subscribeToRoomMessage();
  }

  // scroll chat container to bottom after view checked
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }


  // scroll chat container to the bottom
  scrollToBottom(): void {
    try {
      this.messagesWrapper.nativeElement.scrollTop = this.messagesWrapper.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  // subscription for new room message
  private subscribeToRoomMessage(): void {
    this.webSocketService.newMessageReceived().subscribe((data: ChatMessage) => {
      this.room.messages.push(data);
      setTimeout(() => {
        this.scrollToBottom();
      });
    });
  }
}
