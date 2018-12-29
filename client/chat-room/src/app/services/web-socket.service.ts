import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';
import {environment} from '../../environments/environment';
import {ChatMessage, Room, User} from '../models';

// web-socket service to handle and emit socket.io events
@Injectable()
export class WebSocketService {

  private socket = io(environment.api);
  constructor() { }

  // emits user join room event
  joinRoom(user: User, room: Room): void {
    this.socket.emit('joinRoom', {user, room});
  }

  // emits user leave room event
  leaveRoom(room: Room, user: User): void {
    this.socket.emit('leaveRoom', {user, room});
  }

  // emits user send message event
  sendMessage(data: any): void {
    this.socket.emit('message', data);
  }

  // emits user join room event
  joinRooms(): void {
    this.socket.emit('joinRooms');
  }

  // emits user add room event
  addRoom(room: Room): void {
    this.socket.emit('room', room);
  }

  // subscription for new room event
  newRoomReceived(): Observable<Room> {
    return new Observable<Room>(observer => {
      this.socket.on('new room', (data) => {
        observer.next(data);
      });
      return () => {
        this.disconnect();
      };
    });
  }

  // subscription for user joined to particular room event
  newUserReceived(): Observable<User> {
    return new Observable<User>(observer => {
      this.socket.on('new user', (data) => {
        observer.next(data);
      });
      return () => {
        this.disconnect();
      };
    });
  }

  // subscription for user left particular room event
  userLeftReceived(): Observable<User> {
    return new Observable<User>(observer => {
      this.socket.on('user left', (data) => {
        observer.next(data);
      });
      return () => {
        this.disconnect();
      };
    });
  }

  // subscription for new message sent in particular rooms
  newMessageReceived(): Observable<ChatMessage> {
    return new Observable<ChatMessage>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {
        this.disconnect();
      };
    });
  }

  private disconnect(): void {
    this.socket.disconnect();
  }

}
