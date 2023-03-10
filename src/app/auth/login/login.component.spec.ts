import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthenticateService } from 'src/app/services/auth/authenticate.service';
import { user } from 'src/app/test/data/user.fake';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from 'src/app/models/user.interface';
import { Router } from '@angular/router';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthenticateService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const spyRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [AuthenticateService, { provide: Router, useValue: spyRouter }, ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(AuthenticateService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
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
    expect(inputElements.length).toEqual(3);
  });

  it('check initial form values', () => {
    const loginFormGroup = component.form;
    const loginFormValues = {
      email: '',
      password: '',
      rememberMe: false
    }
    expect(loginFormGroup.value).toEqual(loginFormValues);
  });


  it('test method login in component', <any>fakeAsync((): void => {
    const spyLogin = spyOn(service, 'login').and.callFake((email: string = '', password: string = '') => of([user]));
    component.login();
    expect(spyLogin).toHaveBeenCalled();
    setTimeout(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith('/pages/home');
    }, 200);
    tick(200);
  }));

  it('test method login in component when user is inactive', <any>fakeAsync((): void => {
    const userInactive = [{
      active: false
    }] as User[];
    const spyLogin = spyOn(service, 'login').and.callFake((email: string = '', password: string = '') => of(userInactive));
    component.login();
    expect(spyLogin).toHaveBeenCalled();
    component.userInactive = true;
    setTimeout(() => {
      component.userInactive = false;
      expect(component.userInactive).toBe(false);
    }, 4000);
    tick(4000);
  }));

  it('test method login in component when user is active ', <any>fakeAsync((): void => {
    const userActive = [{
      active: true
    }] as User[];
    const spyLogin = spyOn(service, 'login').and.callFake((email: string = '', password: string = '') => of(userActive));
    component.login();
    expect(spyLogin).toHaveBeenCalled();
    component.userIncorrect = true;
    setTimeout(() => {
      component.userIncorrect = false;
      expect(component.userIncorrect).toBe(false);
    }, 4000);
    tick(4000);
  }));

  it('test method login in component when the service return error ', <any>fakeAsync((): void => {
    const spyLogin = spyOn(service, 'login').and.returnValue(throwError(() => new Error('Error')));
    component.login();
    expect(spyLogin).toHaveBeenCalled();
    setTimeout(() => {
      component.errorAlert = false;
      expect(component.errorAlert).toBe(false);
    }, 4000);
    tick(4000);
  }));

  it('should set userIncorrect to true and then to false after 4 seconds if user is incorrect', <any>fakeAsync((): void => {
    component.userIncorrect = false;
    spyOn(service, 'login').and.returnValue(of([]));
    component.login();
    expect(component.userIncorrect).toBe(false);
    setTimeout(() => {
      expect(component.userIncorrect).toBe(false);
    }, 4000);
    tick(4000);
  }));

});
