import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(routeSnapshot: ActivatedRouteSnapshot, routerSnapshot: RouterStateSnapshot): boolean | Observable<boolean> {
    const page = encodeURI(routerSnapshot.url);
    return this.hasAccessTo(page);
  }

  canLoad(route: Route): boolean | Observable<boolean> {
    const page = encodeURI(route.path || "");
    return this.hasAccessTo(page);
  }

  private hasAccessTo(page: string): boolean {
    if (!this.authService.isUserLoggedIn()) {
      this.navigateToLoginAndRedirect(page);
      return false;
    }
    return true;
  }

  private navigateToLoginAndRedirect(page: string): void {
    this.router.navigate(["/login"], {queryParams: {redirect: page}});
  }

}
