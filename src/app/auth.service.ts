import {Injectable} from '@angular/core';

const LOGGED_USER = "loggedUser";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private VALID_USERS = [
    {username: "admin", password: "admin_12345"},
    {username: "user1", password: "12345_user1"}
  ];

  constructor() {
  }

  login(username: string, password: string): boolean {
    const user = this.getUser(username);
    if (user && this.isPasswordCorrect(user, password)) {
      localStorage.setItem(LOGGED_USER, JSON.stringify(user));
      return true;
    }
    return false;
  }

  private getUser(username: string): { username: string, password: string } | undefined {
    return this.VALID_USERS.find(u => u.username === username);
  }

  private isPasswordCorrect(user: { username: string, password: string }, password: string): boolean {
    return user.password === password;
  }

  logout(): void {
    localStorage.removeItem(LOGGED_USER);
  }

  isUserLoggedIn(): boolean {
    return this.getLoggedUser() != null;
  }

  private getLoggedUser(): Object | null {
    return localStorage.getItem(LOGGED_USER);
  }

}
