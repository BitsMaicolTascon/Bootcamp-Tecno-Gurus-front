import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/auth/authenticate.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
AuthenticateService

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let authService: AuthenticateService;

  beforeEach(async () => {
    const spyRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ HeaderComponent ],
      providers: [AuthenticateService, { provide: Router, useValue: spyRouter }]
    })
    .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = fixture.debugElement.injector.get(AuthenticateService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the status when showSide is called', () => {
    component.status = false;
    component.showSide();
    expect(component.status).toBe(true);
    component.showSide();
    expect(component.status).toBe(false);
  });

  it('should call the event function with the new status when showSide is called', () => {
    component.status = false;
    spyOn(component, 'event');
    component.showSide();
    expect(component.event).toHaveBeenCalledWith(true);
    component.showSide();
    expect(component.event).toHaveBeenCalledWith(false);
  });

  it("test a method event in header component", () => {
    const show = true;
    const spyEmitter = spyOn(component.showSidebar, 'emit');
    component.event(show);
    expect(spyEmitter).toHaveBeenCalledWith(true);
  });

  it('should logout the user', () => {
    component.logout();
    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('currentUser')).toBeNull();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/auth/login');
  });
});
