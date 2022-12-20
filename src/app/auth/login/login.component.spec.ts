import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthenticateService } from 'src/app/services/auth/authenticate.service';
import { user } from 'src/app/test/data/user.fake';
import { ReactiveFormsModule } from '@angular/forms';



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthenticateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [LoginComponent],
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


  it('method getAddressIp call from ngOnInit', () => {
    const spyGetAddressIp = spyOn((component as any), 'getAddressIp').and.callThrough();
    const spyAuthService = spyOn(service, 'getAddressIp').and.returnValue(of(Object));
    component.ngOnInit();
    expect(spyGetAddressIp).toHaveBeenCalled();
    expect(spyAuthService).toHaveBeenCalled();
  })

  it('test a form group', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('#loginForm');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(2);
  });

  it('check initial form values', () => {
    const loginFormGroup = component.form;
    const loginFormValues = {
      email: '',
      password: '',
    }
    expect(loginFormGroup.value).toEqual(loginFormValues);
  });


  it('test method login in component', () => {
    const spySaveSessionComponent = spyOn((component as any), 'saveSession').and.callThrough();
    const spySetUserInStorage = spyOn((component as any), 'setUserInStorage').and.callThrough();
    const spySetTokenInStorage = spyOn((component as any), 'setTokenInStorage').and.callThrough();
    const spyLogin = spyOn(service, 'login').and.callFake((email: string = '', password: string = '') => of(user));
    component.login();
    expect(spyLogin).toHaveBeenCalled();
    expect(spySaveSessionComponent).toHaveBeenCalled();
    expect(spySetUserInStorage).toHaveBeenCalled();
    expect(spySetTokenInStorage).toHaveBeenCalled();
  });

});
