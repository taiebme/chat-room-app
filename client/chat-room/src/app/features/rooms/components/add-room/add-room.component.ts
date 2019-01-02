import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AlertService, RoomService} from '../../../../services';
import {WebSocketService} from '../../../../services/web-socket.service';


@Component({
  selector: 'add-room',
  templateUrl: './add-room.component.html'
})
export class AddRoomComponent implements OnInit {
  public createRoomForm: FormGroup;
  public formSubmitted = false;
  public loading = false;

  constructor(private formBuilder: FormBuilder,
              private roomService: RoomService,
              private alertService: AlertService,
              private webSocketService: WebSocketService) {
  }

  ngOnInit(): void {
    this.createRoomForm = this.formBuilder.group({
      roomName: ['']
    });
  }

  // easy access to form fields
  get form(): any {
    return this.createRoomForm.controls;
  }

  onSubmit() {
    this.formSubmitted = true;

    // check if form is valid
    if (this.createRoomForm.valid) {
      this.loading = true;
      this.roomService.addRoom(this.form.roomName.value)
          .subscribe(
              (res) => {
                this.loading = false;
                this.webSocketService.addRoom(res);
                this.createRoomForm.reset();
              },
              error => {
                this.alertService.error(error);
                this.loading = false;
              });
    }
  }
}
