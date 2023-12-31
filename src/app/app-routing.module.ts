import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TodoComponent } from "./todo/todo.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import {
  AuthGuard,
  CounterAuthGuard,
} from "./auth-guard.service";
import { LoginPageComponent } from "./login-page/login-page.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SignupPageComponent } from "./signup-page/signup-page.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";

export const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  {
    path: "auth",
    canActivate: [CounterAuthGuard],  
    children: [
      { path: "login", component: LoginPageComponent, pathMatch: "full" },
      { path: "signup", component: SignupPageComponent },
      { path: "forgot-password", component: ForgotPasswordComponent },
    ],
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: TodoComponent },
      {
        path: "ang-tables",
        loadChildren: () =>  import('./datatable/datatable.module').then((m) => m.DatatableModule)
      },
      {path:'charts', loadChildren: () =>  import('./charts/charts.module').then((m) => m.ChartsModule)}
    ],
  },
  { path: "not-found", component: PageNotFoundComponent },
  { path: "**", redirectTo: "not-found" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
