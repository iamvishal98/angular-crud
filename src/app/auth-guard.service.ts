import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./services/auth.service";


export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> | Promise<boolean> | boolean | UrlTree => {
  return inject(AuthService).loggedIn
    ? true
    : inject(Router).navigate(["/auth/login"]);
};

// export const AuthGuardChild: CanActivateChildFn = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ): Observable<boolean> | Promise<boolean> | boolean => {
//   return inject(AuthService).loggedIn;
// };

export const CounterAuthGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> | Promise<boolean> | boolean | UrlTree => {
  // console.log(inject(AuthService).loggedIn);

  return !inject(AuthService).loggedIn
    ? true
    : inject(Router).navigate(["/dashboard"]);
};
