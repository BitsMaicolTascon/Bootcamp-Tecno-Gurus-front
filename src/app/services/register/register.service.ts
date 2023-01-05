import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private headers: any;

  constructor(public http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  register(user: User): Observable<User> {
    console.log(user);

    return this.http.post<User>(`${environment.API_REST_URL}/users/register/`, {
      phoneNumber: user.phoneNumber,
      email: user.email,
      password: user.password,
      role: user.role
    }, {headers: this.headers});
  }


}
