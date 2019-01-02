import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ChatMessage, Room, User} from '../../../../models';
import {WebSocketService} from '../../../../services/web-socket.service';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
    selector: 'send-message',
    templateUrl: './send-message.component.html',
    styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
    @Input() nickname: string;
    @Input() roomId: number;

    constructor(private formBuilder: FormBuilder,
                private webSocketService: WebSocketService) {
    }
    public newMessageForm: FormGroup;

    ngOnInit(): void {
        // initializing of component form
        this.newMessageForm = this.formBuilder.group({
            message: ['']
        });
    }

    // send socket message to the current room
    sendMessage(): void {
        const message = this.getMessage();
        this.webSocketService.sendMessage({
            roomId: this.roomId,
            chatMessage: message
        });
        this.newMessageForm.reset();
    }

    // creat new ChatMessage object
    getMessage(): ChatMessage {
        return {
            message: this.newMessageForm.controls.message.value,
            nickname: this.nickname,
            time: new Date()
        };
    }


}
