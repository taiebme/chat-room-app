import {Room} from '../../models';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {RoomService} from '../../services';
import {map} from 'rxjs/operators';
import {WebSocketService} from '../../services/webSocket.service';


@Injectable()
export class RoomsResolver implements Resolve<Room> {

  constructor(private roomService: RoomService, private webSocketService: WebSocketService) {
    this.webSocketService.joinRooms();
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Room> {

    return this.roomService.getRooms()
      .pipe(
        map((data: any) => {
          return data.rooms;
        })
      );
  }

}
