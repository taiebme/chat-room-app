import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {User} from '../models';

@Injectable()
export class UserService {
  private apiUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {
  }

  getAllUsers() {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUser(nickname: string) {
    return this.http.get(`${this.apiUrl}/users/${nickname}`);
  }

  delete(nickname: string) {
    return this.http.delete(`${this.apiUrl}/users/${nickname}`);
  }
}
