import {Routes} from '@angular/router';
import {RoomsComponent} from './features/rooms';

import {AuthGuard} from './guards';
import {HomeComponent} from "./features/home";
import {RoomComponent} from "./features/room";
import {RoomsResolver} from "./features/rooms";
import {RoomResolver} from "./features/room";

export const appRoutes: Routes = [
  {path: '', component: RoomsComponent, canActivate: [AuthGuard], resolve: { rooms: RoomsResolver}},
  {path: 'home', component: HomeComponent},
  {path: 'rooms', component: RoomsComponent, canActivate: [AuthGuard], resolve: { rooms: RoomsResolver}},
  {path: 'chatroom/:roomId', component: RoomComponent, canActivate: [AuthGuard], resolve: { room: RoomResolver} },

  // fallback to homepage
  {path: '**', redirectTo: 'home'}
];
