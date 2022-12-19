import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, of } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthenticateService } from 'src/app/services/auth/authenticate.service';
import { user } from 'src/app/test/data/user.fake';
import { session } from '../../test/data/session.fake';



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthenticateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ LoginComponent ],
      providers: [AuthenticateService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(AuthenticateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('test method login in component', () => {
    const spyGetAddressIp = spyOn((component as any), 'getAddressIp').and.callThrough();
    const spySaveSessionComponent = spyOn((component as any), 'saveSession').and.callThrough();
    const spySetUserInStorage = spyOn((component as any), 'setUserInStorage').and.callThrough();
    const spySetTokenInStorage = spyOn((component as any), 'setTokenInStorage').and.callThrough();
    const spyLogin = spyOn(service, 'login').and.callFake((email: string = '', password: string = '') => of(user));
    component.login();
    expect(spyLogin).toHaveBeenCalled();
    expect(spyGetAddressIp).toHaveBeenCalled();
    expect(spySaveSessionComponent).toHaveBeenCalled();
    expect(spySetUserInStorage).toHaveBeenCalled();
    expect(spySetTokenInStorage).toHaveBeenCalled();
  });

});
