import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { PerfilComponent } from './perfil.component';
import { UserService } from 'src/app/services/user/user.service';


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
    const formElement = fixture.debugElement.nativeElement.querySelector('#registerForm');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(5);
  });

  it('check initial form values', () => {
    const perfilFormGroup = component.form;
    const perfilFormValues = {
      name: '',
      lasName: '',
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

});
