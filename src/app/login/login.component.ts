import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usernamePh = $localize `Username`;
  passwordPh = $localize `Password`;

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(5), Validators.pattern("^[a-zA-Z0-9\_\.\-]+$")]),
    password: new FormControl("", [Validators.required, Validators.minLength(10)])
  });

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
  }

  loginUser(): boolean {
    const loginSuccessful = this.authService.login(this.loginForm.get("username")?.value, this.loginForm.get("password")?.value);
    if (!loginSuccessful) {
      this.loginForm.setErrors({loginFailed: true});
    }
    return loginSuccessful;
  }

  get username() {
    return this.loginForm.get("username");
  }

  get password() {
    return this.loginForm.get("password");
  }

}
