import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserDbComponent} from "./user-db/user-db.component";
import {UserComponent} from "./user/user.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./auth.guard";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: "home", redirectTo: "/", pathMatch: "full"},
  {path: "dash", redirectTo: "/", pathMatch: "full"},
  {path: "user-db", component: UserDbComponent, canActivate: [AuthGuard]},
  {path: "user", component: UserComponent, canActivate: [AuthGuard]},
  {path: "login", component: LoginComponent},
  {path: "", component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
