import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../../../../models';
import {WebSocketService} from '../../../../services/web-socket.service';


@Component({
  selector: 'room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  @Input() rooms: Room[];
  constructor(private webSocketService: WebSocketService) {
    this.subscribeToNewRoom();
  }

  ngOnInit(): void {
  }

  private subscribeToNewRoom() {
    this.webSocketService.newRoomReceived().subscribe((data: Room) => {
      this.rooms.push(data);
    });
  }
}
