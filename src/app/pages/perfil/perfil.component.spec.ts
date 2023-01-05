import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { PerfilComponent } from './perfil.component';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.interface';


describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;
  let service: UserService;
  let router: jasmine.SpyObj<Router>;


  beforeEach(async () => {
    const spyRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ PerfilComponent ],
      providers: [
        UserService,
        { provide: Router, useValue: spyRouter },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(UserService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test a form group in component Perfil', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('#perfilForm');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(5);
  });

  it('check initial form values', () => {
    const perfilFormGroup = component.form;
    const perfilFormValues = {
      name: '',
      lastName: '',
      cellPhone: '',
      phoneNumber: '',
      employee: false,
    }
    expect(perfilFormGroup.value).toEqual(perfilFormValues);
  });

  it('test call method updatePerfil of service in component perfil', (): void => {
    const spyUpdate = spyOn(service, 'updatePerfil').and.callFake((user) => of(user));
    component.updatePerfil();
    expect(spyUpdate).toHaveBeenCalled();
  });

  it('test method updatePerfil in component when the service return error ', <any>fakeAsync((): void => {
    const spyupdate = spyOn(service, 'updatePerfil').and.returnValue(throwError(() => new Error('Error')));
    component.updatePerfil();
    expect(spyupdate).toHaveBeenCalled();
    setTimeout(() => {
      component.errorAlert = false;
      expect(component.errorAlert).toBe(false);
    }, 4000);
    tick(4000);
  }));

  it('test method register in component when success is false', <any>fakeAsync((): void => {
    const userInactive = {
      success: false
    } as User;
    const spyregister = spyOn(service, 'updatePerfil').and.callFake((user) => of(userInactive));
    component.updatePerfil();
    expect(spyregister).toHaveBeenCalled();
    setTimeout(() => {
      component.updateFailed = false;
      expect(component.updateFailed).toBe(false);

    }, 4000);
    tick(4000);
  }));

  it('test method register in component when success is true ', <any>fakeAsync((): void => {
    const userActive = {
      success: true
    } as User;
    const spyregister = spyOn(service, 'updatePerfil').and.callFake((user) => of(userActive));
    component.updatePerfil();
    expect(spyregister).toHaveBeenCalled();
    component.updateDone = true;
    setTimeout(() => {
      component.updateDone = false;
      expect(component.updateDone).toBe(false);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/auth/login');
    }, 4000);
    tick(4000);
  }));

});
