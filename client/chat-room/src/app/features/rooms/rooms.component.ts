import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Room} from '../../models';


@Component({
  templateUrl: 'rooms.component.html'
})
export class RoomsComponent implements OnInit {
  rooms: Room[];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.rooms = this.route.snapshot.data.rooms;
  }


}
