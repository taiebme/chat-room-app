import {Component, Input} from '@angular/core';
import {User} from '../../../../models';
import {WebSocketService} from '../../../../services/web-socket.service';


@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
    @Input() users: User[];

    constructor(private webSocketService: WebSocketService) {
        // initialize websocket listeners
        this.subscribeToNewUser();
        this.subscribeToUserLeft();
    }


    // subscription for new user
    private subscribeToNewUser(): void {
        this.webSocketService.newUserReceived().subscribe((data: User) => {
            this.users.push(data);
        });
    }

    // subscription for user left
    private subscribeToUserLeft(): void {
        let userIndex = 0;
        this.webSocketService.userLeftReceived().subscribe((data: User) => {
            for (const user of this.users) {
                if (user._id === data._id) {
                    break;
                }
                userIndex++;
            }
            this.users.splice(userIndex, 1);
        });
    }
}
