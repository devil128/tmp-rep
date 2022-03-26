import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loginForm should be empty by default', () => {
    expect(component.loginForm.get("username")?.value).toMatch("");
    expect(component.loginForm.get("password")?.value).toMatch("");
  });

  it('loginUser() should return false when loginForm is empty', () => {
    expect(component.loginForm.get("username")?.value).toMatch("");
    expect(component.loginForm.get("password")?.value).toMatch("");
    expect(component.loginUser()).toBeFalsy();
  });

  it('loginUser() should return true when loginForm contains a known user', () => {
    component.loginForm.get("username")?.setValue("admin");
    component.loginForm.get("password")?.setValue("admin_12345");
    expect(component.loginUser()).toBeTruthy();
  });

  it('loginForm should contain an error when an unknown user tries to log in', () => {
    component.loginForm.get("username")?.setValue("nimda");
    component.loginForm.get("password")?.setValue("admin_12345");
    expect(component.loginUser()).toBeFalsy();
    expect(component.loginForm.getError('loginFailed')).toBeDefined();
  });

  it('loginForm should contain no error when a known user tries to log in', () => {
    component.loginForm.get("username")?.setValue("admin");
    component.loginForm.get("password")?.setValue("admin_12345");
    expect(component.loginUser()).toBeTruthy();
    expect(component.loginForm.getError('loginFailed')).toBeNull();
  });

  it('getter for username should not return null', function () {
    expect(component.username).toBeDefined();
  });

  it('getter for password should not return null', function () {
    expect(component.password).toBeDefined();
  });
});
