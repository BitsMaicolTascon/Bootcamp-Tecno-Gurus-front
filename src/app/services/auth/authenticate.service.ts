import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Session } from '../../models/session.interface';
import { User } from '../../models/user.interface';



@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(public http: HttpClient) { }
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.API_REST_URL}/users/login/`, {
      email,
      password,
    });
  }

  setUserInStorage(user: User): void {
    const userInfo = JSON.stringify(user);
    localStorage.setItem('currentUsuario', userInfo);
  }

  setTokenAuth(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  getTokenUser(): string {
    return String(localStorage.getItem('accessToken'));
  }

  getAddressIp() {
    return this.http.get(`${environment.API_GET_IP}`);
  }

  saveSession(session: Session): Observable<Session> {
    return this.http.post<Session>(`${environment.API_REST_URL}/users/session/`, { session });
  }


}
