import {Component, OnInit} from '@angular/core';
import {AlertService, RoomService} from "../../services";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Room} from "../../models";
import {WebSocketService} from "../../services/webSocket.service";


@Component({
  templateUrl: 'rooms.component.html'
})
export class RoomsComponent implements OnInit {
  createRoomForm: FormGroup;
  loading = false;
  formSubmitted = false;
  rooms: Room[];

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private roomService: RoomService,
              private alertService: AlertService,
              private webSocketService: WebSocketService) {

    this.subscribeToNewRoom();
  }

  ngOnInit() {
    this.rooms = this.route.snapshot.data.rooms;
    this.createRoomForm = this.formBuilder.group({
      roomName: ['', Validators.required]
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

  private subscribeToNewRoom() {
    this.webSocketService.newRoomReceived().subscribe((data: Room) => {
      this.rooms.push(data);
    });
  }

}
