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
import {ChatMessageComponent} from './features/room/components/chat-message.component';
import {RoomComponent} from './features/room';
import {WebSocketService} from './services/web-socket.service';
import {RoomsResolver} from './features/rooms';
import {RoomResolver} from './features/room';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SignInComponent,
        SignUpComponent,
        RoomsComponent,
        AlertComponent,
        RoomComponent,
        ChatMessageComponent
    ],
    imports: [
        BrowserModule,
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
