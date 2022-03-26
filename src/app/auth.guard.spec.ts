import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {RouterTestingModule} from "@angular/router/testing";
import {AuthService} from "./auth.service";
import {MockAuthService} from "./mocks";
import {Route, Router} from "@angular/router";

describe('AuthGuard', () => {
  let guard: AuthGuard;
  const mockRouteSnapshot: any = {snapshot: {}};
  const mockRouterSnapshot: any = {snapshot: {}, url: "/canActivate"};
  const mockRoute: Route = {path: "/canLoad"};
  let routerSpy = {navigate: jasmine.createSpy("navigate")};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {provide: AuthService, useClass: MockAuthService},
        {provide: Router, useValue: routerSpy}
      ]
    }).compileComponents();
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('hasAccessTo() should return false by default', () => {
    // @ts-ignore
    expect(guard.hasAccessTo("/login")).toBeFalsy();
  });

  it('hasAccessTo() should return true after successful login', () => {
    // @ts-ignore
    expect(guard.authService.login("admin", "admin_12345")).toBeTruthy();
    // @ts-ignore
    expect(guard.hasAccessTo("/login")).toBeTruthy();
  });

  it('navigateToLoginAndRedirect() should call router.navigate', function () {
    // @ts-ignore
    guard.navigateToLoginAndRedirect("/testRedirect");
    expect(routerSpy.navigate).toHaveBeenCalledWith(["/login"], {queryParams: {redirect: "/testRedirect"}});
  });

  it('canActivate() should return false and redirect to login page by default', () => {
    expect(guard.canActivate(mockRouteSnapshot, mockRouterSnapshot)).toBeFalsy();
    expect(routerSpy.navigate).toHaveBeenCalledWith(["/login"], {queryParams: {redirect: "/canActivate"}});
  });

  it('canLoad() should return false and redirect to login page by default', () => {
    expect(guard.canLoad(mockRoute)).toBeFalsy();
    expect(routerSpy.navigate).toHaveBeenCalledWith(["/login"], {queryParams: {redirect: "/canLoad"}});
  });

});
