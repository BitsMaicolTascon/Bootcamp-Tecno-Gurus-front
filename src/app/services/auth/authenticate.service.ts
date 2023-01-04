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
  private headers: any;

  constructor(public http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }
  login(email: string, password: string): Observable<User[]> {
    return this.http.post<User[]>(`${environment.API_REST_URL}/users/auth/login`, {
      email,
      password,
    }, { headers: this.headers });
  }

  setUserInStorage(user: User): void {
    const userInfo = JSON.stringify(user);
    localStorage.setItem('currentUser', userInfo);
  }


  setTokenAuth(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  getTokenUser(): string {
    return String(localStorage.getItem('accessToken'));
  }

  getUserInStorage(): any {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      const user: User = JSON.parse(userString);
      return user;
    }
  }

  getAddressIp() {
    return this.http.get(`${environment.API_GET_IP}`);
  }

  saveSession(session: Session): Observable<Session> {
    return this.http.post<Session>(`${environment.API_REST_URL}/users/session/`, { session });
  }


}
