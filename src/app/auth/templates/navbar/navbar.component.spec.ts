import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';




describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const spyRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers: [
        { provide: Router, useValue: spyRouter },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test in Router navigate of register URL', () => {
    router.navigateByUrl.and.returnValue(Promise.resolve(true));
    component.redirect('/auth/register');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/auth/register');
  });

  it('test in Router navigate of login URL', () => {
    router.navigateByUrl.and.returnValue(Promise.resolve(true));
    component.redirect('/auth/login');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/auth/login');
  });
});


