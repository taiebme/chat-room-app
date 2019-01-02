import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Room, User} from '../../models';
import {ActivatedRoute} from '@angular/router';
import {WebSocketService} from '../../services/web-socket.service';


@Component({
    templateUrl: './room.component.html'
})
export class RoomComponent implements OnInit, OnDestroy {
    public room: Room;
    public activeUser: User;

    constructor(private route: ActivatedRoute,
                private webSocketService: WebSocketService) {

    }

    ngOnInit(): void {
        // get active user from local storage
        this.activeUser = JSON.parse(localStorage.getItem('activeUser'));
        this.room = this.route.snapshot.data.room;
        // join current room
        this.webSocketService.joinRoom(this.activeUser, this.room);
    }

    // listener for url changing, notify room subscribers about leaving the room
    @HostListener('window:beforeunload', ['$event'])
    ngOnDestroy(): void {
        this.webSocketService.leaveRoom(this.room, this.activeUser);
    }


}
