import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import * as io from 'socket.io-client';
import {environment} from "../../environments/environment";
import {ChatMessage, Room, User} from "../models";


@Injectable()
export class WebSocketService {

  private socket = io(environment.api);
  constructor() { }

  joinRoom(user: User, room: Room) {
    this.socket.emit('joinRoom', {user, room});
  }

  leaveRoom(room: Room, user: User) {
    this.socket.emit('leaveRoom', {user, room});
  }

  sendMessage(data: any) {
    this.socket.emit('message', data);
  }

  joinRooms() {
    this.socket.emit('joinRooms');
  }

  addRoom(room: Room){
    this.socket.emit('room', room);
  }

  newRoomReceived() {
    return new Observable<Room>(observer => {
      this.socket.on('new room', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  newUserReceived(): Observable<User>{
    return new Observable<User>(observer => {
      this.socket.on('new user', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  userLeftReceived() {
    return new Observable<User>(observer => {
      this.socket.on('user left', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  newMessageReceived() {
    return new Observable<ChatMessage>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }


}
