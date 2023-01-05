import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from 'src/app/models/user.interface';
import { user } from 'src/app/test/data/user.fake';
import { environment } from 'src/environments/environment';

import { RegisterService } from './register.service';

describe('RegisterService', () => {
  let service: RegisterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        RegisterService
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(RegisterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Register method return a user', () => {
    service.register(user).subscribe((resp: User) => {
      expect(typeof user).toBe('object');
      expect(resp).toEqual(user);
    })
    const req = httpMock.expectOne(environment.API_REST_URL + '/users/register/');
    expect(req.request.method).toBe('POST');
    req.flush(user);
  });


});
