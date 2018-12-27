import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {User, UserForm} from "../models";
import {Observable} from "rxjs";

@Injectable()
export class AuthService {
  private apiUrl = `${environment.api}/auth`;

  constructor(private http: HttpClient) {
  }

  signIn(email: string, password: string): any {
    return this.http.post<User>(`${this.apiUrl}/signIn`, {email, password})
      .pipe(
        map(user => {
          let activeUser: User;
          if(user){
            // success login if response contains jwt token
            if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('activeUser', JSON.stringify(user));
              activeUser = user;
            }
          }

        return activeUser;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('activeUser');

  }

  signUp(userForm: UserForm): Observable<any> {
    return this.http.post(`${this.apiUrl}/signUp`, userForm)
      .pipe(
        map(user =>
          {
            localStorage.setItem('activeUser', JSON.stringify(user));
          }
        )
      );
  }
}
