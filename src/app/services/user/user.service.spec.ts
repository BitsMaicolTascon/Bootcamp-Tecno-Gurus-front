import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from 'src/app/models/user.interface';
import { user } from 'src/app/test/data/user.fake';
import { environment } from 'src/environments/environment';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UserService
      ]
    });

  });

  beforeEach(() => {
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Update Perfil method return a user', () => {
    service.updatePerfil(user).subscribe((resp: User) => {
      expect(typeof user).toBe('object');
      expect(resp).toEqual(user);
    })
    const req = httpMock.expectOne(environment.API_REST_URL + '/users/identifications/');
    expect(req.request.method).toBe('PUT');
    req.flush(user);
  });

});
