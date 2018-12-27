import {Room} from '../../models';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {RoomService} from '../../services';
import {map} from 'rxjs/operators';


@Injectable()
export class RoomResolver implements Resolve<Room> {

  constructor(private roomService: RoomService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Room> {
    return this.roomService.getRoom(route.params['roomId'])
      .pipe(
        map((data: any) => {
          return data.room;
        })
      );
  }

}
