import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AlertService, AuthService, UserService} from './services';
import {AuthGuard} from './guards';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor} from './interceptors';
import {JwtInterceptor} from './interceptors';
import {AlertComponent} from './components/alert';
import {SignInComponent, SignUpComponent} from './features/home';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app.routing';
import {RoomsComponent} from './features/rooms';
import {HomeComponent} from './features/home';
import {RoomService} from './services';
import {RoomComponent} from './features/room';
import {WebSocketService} from './services/web-socket.service';
import {RoomsResolver} from './features/rooms';
import {RoomResolver} from './features/room';
import {OrderModule} from 'ngx-order-pipe';
import {RoomMessagesComponent} from './features/room/components/room-messages/room-messages.component';
import {SendMessageComponent} from './features/room/components/send-message/send-message.component';
import {ChatMessageComponent} from './features/room/components/chat-message/chat-message.component';
import {UserListComponent} from './features/room/components/user-list/user-list.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SignInComponent,
        SignUpComponent,
        RoomsComponent,
        AlertComponent,
        RoomComponent,
        RoomMessagesComponent,
        SendMessageComponent,
        ChatMessageComponent,
        UserListComponent
    ],
    imports: [
        BrowserModule,
        OrderModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthService,
        UserService,
        RoomService,
        WebSocketService,
        RoomsResolver,
        RoomResolver,
        // wire-up interceptors
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
