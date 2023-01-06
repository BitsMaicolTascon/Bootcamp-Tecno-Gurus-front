import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';


import { User } from 'src/app/models/user.interface';
import { Router } from '@angular/router';

import { RecoverComponent } from './recover.component';
import { AuthenticateService } from 'src/app/services/auth/authenticate.service';
import { user } from 'src/app/test/data/user.fake';

describe('RecoverComponent', () => {
  let component: RecoverComponent;
  let fixture: ComponentFixture<RecoverComponent>;
  let service: AuthenticateService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const spyRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ RecoverComponent ],
      providers: [
        AuthenticateService,
        { provide: Router, useValue: spyRouter },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(AuthenticateService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test a form group', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('#recoverForm');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(1);
  });

  it('check initial form values', () => {
    const recoverFormGroup = component.form;
    const recoverFormValues = {
      email: '',
    }
    expect(recoverFormGroup.value).toEqual(recoverFormValues);
  });

  it('test call method recover of service in component recover', (): void => {
    const email = '';
    const spyrecover = spyOn(service, 'recoverPassword').and.callFake((email) => of(user));
    component.recoverPassword();
    expect(spyrecover).toHaveBeenCalled();

  });

  it('test method recover in component when success is false', <any>fakeAsync((): void => {
    const userInactive = {
      success: false
    } as User;
    const spyrecover = spyOn(service, 'recoverPassword').and.callFake((user) => of(userInactive));
    component.recoverPassword();
    expect(spyrecover).toHaveBeenCalled();
    setTimeout(() => {
      component.recoverFailed = false;
      expect(component.recoverFailed).toBe(false);

    }, 4000);
    tick(4000);
  }));

  it('test method recover in component when success is true ', <any>fakeAsync((): void => {
    const userActive = {
      success: true
    } as User;
    const spyrecover = spyOn(service, 'recoverPassword').and.callFake((user) => of(userActive));
    component.recoverPassword();
    expect(spyrecover).toHaveBeenCalled();
    component.recoverDone = true;
    setTimeout(() => {
      component.recoverDone = false;
      expect(component.recoverDone).toBe(false);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/auth/login');
    }, 4000);
    tick(4000);
  }));


  it('test method recover in component when the service return error ', <any>fakeAsync((): void => {
    const spyrecover = spyOn(service,'recoverPassword').and.returnValue(throwError(() => new Error('Error')));
    component.recoverPassword();
    expect(spyrecover).toHaveBeenCalled();
    setTimeout(() => {
      component.errorAlert = false;
      expect(component.errorAlert).toBe(false);
    }, 4000);
    tick(4000);
  }));
});
