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

    return this.http.post<User>(`${environment.API_REST_URL}/users/identifications/`, {
      name: user.name,
      lastName: user.lastName,
      contactPhone: user.phoneNumber,
      perfilImage: '',
      userId: user.documentId,
      employee: user.employee || false
    }, { headers: { 'Content-Type': 'application/json'}});
  }
}
