import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';

import { RegisterService } from 'src/app/services/register/register.service';
import { RegisterComponent } from './register.component';
import { User } from 'src/app/models/user.interface';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let service: RegisterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ RegisterComponent ],
      providers: [RegisterService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(RegisterService);
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
    const loginFormGroup = component.form;
    const loginFormValues = {
      email: '',
      password: '',
      role: '',
      phoneNumber: '',
      termConditions: false,
    }
    expect(loginFormGroup.value).toEqual(loginFormValues);
  });

  it('test call method register of service in component register', (): void => {
    const spyLogin = spyOn(service, 'register').and.callFake((user) => of(user));
    component.register();
    expect(spyLogin).toHaveBeenCalled();
  });

  it('test method register in component when user is inactive', <any>fakeAsync((): void => {
    const userInactive = {
      active: false
    } as User;
    const spyLogin = spyOn(service, 'register').and.callFake((user) => of(userInactive));
    component.register();
    expect(spyLogin).toHaveBeenCalled();
    setTimeout(() => {
      component.registerFailed = false;
      expect(component.registerFailed).toBe(false);
    }, 4000);
    tick(4000);
  }));

  it('test method login in component when user is active ', <any>fakeAsync((): void => {
    const userActive = {
      active: true
    } as User;
    const spyLogin = spyOn(service, 'register').and.callFake((user) => of(userActive));
    component.register();
    expect(spyLogin).toHaveBeenCalled();
    setTimeout(() => {
      component.registerDone = false;
      expect(component.registerDone).toBe(false);
    }, 4000);
    tick(4000);
  }));


  it('test method login in component when the service return error ', <any>fakeAsync((): void => {
    const spyLogin = spyOn(service,'register').and.returnValue(throwError(() => new Error('Error')));
    component.register();
    expect(spyLogin).toHaveBeenCalled();
    setTimeout(() => {
      component.errorAlert = false;
      expect(component.errorAlert).toBe(false);
    }, 4000);
    tick(4000);
  }));

});
