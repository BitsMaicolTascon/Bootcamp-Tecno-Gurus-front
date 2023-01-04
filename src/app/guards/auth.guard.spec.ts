import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/auth/authenticate.service';
import { AuthGuard } from './auth.guard';
import { fakeRouterStateSnapshot, fakeActivatedRouteSnapshot } from '../test/mocks/snapshot';


describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthenticateService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthenticateService, useValue: { getUserInStorage: () => true } },
        { provide: Router, useValue: { navigate: () => {} } }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthenticateService);
    router = TestBed.inject(Router);
  });

  it('should return true if the user is authenticated', () => {
    const activatedRoute = fakeRouterStateSnapshot({});
    const routerState = fakeActivatedRouteSnapshot({});
    spyOn(authService, 'getUserInStorage').and.returnValue(true);
    expect(authGuard.canActivate(routerState, activatedRoute)).toBe(true);
  });

  it('should navigate to the login page if the user is not authenticated', () => {
    const activatedRoute = fakeRouterStateSnapshot({});
    const routerState = fakeActivatedRouteSnapshot({});
    spyOn(authService, 'getUserInStorage').and.returnValue(false);
    spyOn(router, 'navigate');
    expect(authGuard.canActivate(routerState, activatedRoute)).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

});
