import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    localStorage.clear();
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //getUser()

  it('getUser() should return user for known username', function () {
    // @ts-ignore
    expect(service.getUser("admin")).toBeDefined();
  });

  it('getUser() should return undefined for unknown username', function () {
    // @ts-ignore
    expect(service.getUser("nimda")).toBeUndefined();
  });

  //isPasswordCorrect()

  it('isPasswordCorrect() should return true for a correct user + password', function () {
    // @ts-ignore
    expect(service.isPasswordCorrect({username: "admin", password: "admin_12345"}, "admin_12345")).toBeTruthy();
  });

  it('isPasswordCorrect() should return false for an incorrect user/password', function () {
    // @ts-ignore
    expect(service.isPasswordCorrect({username: "admin", password: "admin_12345"}, "54321_nimda")).toBeFalsy();
  });

  //login()

  it('login() should return true for known user', () => {
    expect(service.login("admin", "admin_12345")).toBeTruthy();
  });

  it('login() should return false for unknown user', () => {
    expect(service.login("nimda", "54321_nimda")).toBeFalsy();
  });

  //getLoggedUser()

  it('getLoggedUser() should return null by default', () => {
    // @ts-ignore
    expect(service.getLoggedUser()).toBeNull();
  });

  it('getLoggedUser() should return user after login of known user', () => {
    expect(service.login("admin", "admin_12345")).toBeTruthy();
    // @ts-ignore
    expect(service.getLoggedUser()).toBeDefined();
  });

  it('getLoggedUser() should return null after logout of known user', () => {
    expect(service.login("admin", "admin_12345")).toBeTruthy();
    service.logout();
    // @ts-ignore
    expect(service.getLoggedUser()).toBeNull();
  });

  it('getLoggedUser() should return null after failed login of unknown user', () => {
    expect(service.login("nimda", "54321_nimda")).toBeFalsy();
    // @ts-ignore
    expect(service.getLoggedUser()).toBeNull();
  });

  //isUserLoggedIn()

  it('isUserLoggedIn() should return false by default', () => {
    expect(service.isUserLoggedIn()).toBeFalsy();
  });

  it('isUserLoggedIn() should return true after login of known user', () => {
    expect(service.login("admin", "admin_12345")).toBeTruthy();
    expect(service.isUserLoggedIn()).toBeTruthy();
  });

  it('isUserLoggedIn() should return false after logout of known user', () => {
    expect(service.login("admin", "admin_12345")).toBeTruthy();
    service.logout();
    expect(service.isUserLoggedIn()).toBeFalsy();
  });

  it('isUserLoggedIn() should return false after failed login of unknown user', () => {
    expect(service.login("nimda", "54321_nimda")).toBeFalsy();
    expect(service.isUserLoggedIn()).toBeFalsy();
  });

});
