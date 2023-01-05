import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  updatePerfil(user: User): Observable<User> {
    console.log(user);

    return this.http.put<User>(`${environment.API_REST_URL}/users/identifications/`, {
      name: user.name,
      lastName: user.lastName,
      contactNumber: user.password,
      role: user.role
    });
  }
}
