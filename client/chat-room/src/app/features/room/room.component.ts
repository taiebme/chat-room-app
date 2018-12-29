import {AfterViewChecked, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChatMessage, Room, User} from '../../models';
import {ActivatedRoute} from '@angular/router';
import {WebSocketService} from '../../services/web-socket.service';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy, AfterViewChecked {

    @ViewChild('messagesWrapper', {read: ElementRef}) messagesWrapper: ElementRef;

    public newMessageForm: FormGroup;
    public room: Room;
    public activeUser: User;

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private webSocketService: WebSocketService) {
        this.subscribeToRoomMessage();
        this.subscribeToNewUser();
        this.subscribeToUserLeft();
    }

    ngOnInit(): void {
        // initializing of component form
        this.newMessageForm = this.formBuilder.group({
            message: ['']
        });
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

    // scroll chat container to bottom after view checked
    ngAfterViewChecked(): void {
        this.scrollToBottom();
    }

    // send socket message to the current room
    sendMessage(): void {
        const message = this.getMessage();
        this.webSocketService.sendMessage({
            roomId: this.room.id,
            chatMessage: message
        });
        this.newMessageForm.reset();
    }

    // creat new ChatMessage object
    getMessage(): ChatMessage {
        return {
            message: this.newMessageForm.controls.message.value,
            nickname: this.activeUser.nickname,
            time: new Date()
        };
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

    // subscription for new user
    private subscribeToNewUser(): void {
        this.webSocketService.newUserReceived().subscribe((data: User) => {
            this.room.users.push(data);
        });
    }

    // subscription for user left
    private subscribeToUserLeft(): void {
        this.webSocketService.userLeftReceived().subscribe((data: User) => {
            this.room.users = this.room.users.filter((user: User) => user._id !== data._id)
        });
    }


}
