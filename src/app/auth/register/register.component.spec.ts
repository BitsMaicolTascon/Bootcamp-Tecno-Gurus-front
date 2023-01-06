import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';

import { RegisterService } from 'src/app/services/register/register.service';
import { RegisterComponent } from './register.component';
import { User } from 'src/app/models/user.interface';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let service: RegisterService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const spyRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ RegisterComponent ],
      providers: [
        RegisterService,
        { provide: Router, useValue: spyRouter },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(RegisterService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test a form group', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('#registerForm');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(6);
  });

  it('check initial form values', () => {
    const registerFormGroup = component.form;
    const registerFormValues = {
      email: '',
      password: '',
      role: '',
      phoneNumber: '',
      termConditions: false,
    }
    expect(registerFormGroup.value).toEqual(registerFormValues);
  });

  it('test call method register of service in component register', (): void => {
    const spyregister = spyOn(service, 'register').and.callFake((user) => of(user));
    component.register();
    expect(spyregister).toHaveBeenCalled();

  });

  it('test method register in component when success is false', <any>fakeAsync((): void => {
    const userInactive = {
      success: false
    } as User;
    const spyregister = spyOn(service, 'register').and.callFake((user) => of(userInactive));
    component.register();
    expect(spyregister).toHaveBeenCalled();
    setTimeout(() => {
      component.registerFailed = false;
      expect(component.registerFailed).toBe(false);

    }, 4000);
    tick(4000);
  }));

  it('test method register in component when success is true ', <any>fakeAsync((): void => {
    const userActive = {
      success: true
    } as User;
    const spyregister = spyOn(service, 'register').and.callFake((user) => of(userActive));
    component.register();
    expect(spyregister).toHaveBeenCalled();
    component.registerDone = true;
    setTimeout(() => {
      component.registerDone = false;
      expect(component.registerDone).toBe(false);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/auth/login');
    }, 4000);
    tick(4000);
  }));


  it('test method register in component when the service return error ', <any>fakeAsync((): void => {
    const spyregister = spyOn(service,'register').and.returnValue(throwError(() => new Error('Error')));
    component.register();
    expect(spyregister).toHaveBeenCalled();
    setTimeout(() => {
      component.errorAlert = false;
      expect(component.errorAlert).toBe(false);
    }, 4000);
    tick(4000);
  }));



});
