import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Room} from '../models';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class RoomService {
  private apiUrl = `${environment.api}/room`;
  constructor(private http: HttpClient) { }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/rooms`);
  }

  getRoom(roomId): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/${roomId}`);
  }


  addRoom(roomName: string): Observable<Room>{
    return this.http.post<Room>(this.apiUrl, {name: roomName});
  }
}
