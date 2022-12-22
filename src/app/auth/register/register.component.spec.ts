import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { RegisterService } from 'src/app/services/register/register.service';
import { RegisterComponent } from './register.component';

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
    expect(inputElements.length).toEqual(5);
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

});
