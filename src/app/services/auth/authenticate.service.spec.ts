import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthenticateService } from './authenticate.service';

import { environment } from 'src/environments/environment';

import { User } from '../../models/user.interface';
import { user } from 'src/app/test/data/user.fake';
import { Session } from '../../models/session.interface';
import { session } from 'src/app/test/data/session.fake';



fdescribe('AuthenticateService', () => {
  let service: AuthenticateService;
  let httpMock: HttpTestingController;
  let storage: any = {};

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticateService);
  });

  beforeEach(() => {
    service = TestBed.inject(AuthenticateService);
    httpMock = TestBed.inject(HttpTestingController);
    storage = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return storage[key] ? storage[key] : null;
    });

    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      return storage[key] = value;
    });

  })

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login method return a user', () => {
    service.login(user.email, user.password).subscribe((resp: User) => {
      expect(resp).toEqual(user);
    })
    const req = httpMock.expectOne(environment.API_REST_URL + '/login');
    expect(req.request.method).toBe('GET');
    req.flush(user);
  });

  it('session method return a session object', () => {
    service.session(session).subscribe((resp: Session) => {
      expect(resp).toEqual(session);
    })
    const req = httpMock.expectOne(environment.API_REST_URL + '/session');
    expect(req.request.method).toBe('GET');
    req.flush(user);
  });


});
