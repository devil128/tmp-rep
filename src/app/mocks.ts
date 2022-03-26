export class MockAuthService {
  private VALID_USERS = [
    {username: "admin", password: "admin_12345"},
    {username: "user1", password: "12345_user1"}
  ];

  private LOGGED_USER: string | null = null;

  login(username: string, password: string): boolean {
    const user = this.getUser(username);
    if (user && this.isPasswordCorrect(user, password)) {
      this.LOGGED_USER = JSON.stringify(user);
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
    this.LOGGED_USER = null;
  }

  isUserLoggedIn(): boolean {
    return this.getLoggedUser() != null;
  }

  private getLoggedUser(): Object | null {
    return this.LOGGED_USER;
  }

}
