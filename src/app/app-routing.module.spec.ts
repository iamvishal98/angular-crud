// import { TestBed, fakeAsync, flush, tick } from "@angular/core/testing";
// import { DashboardComponent } from "./dashboard/dashboard.component";
// import { RouterTestingModule } from "@angular/router/testing";
// import { CanActivateFn, Router, Routes } from "@angular/router";
// import { Location } from "@angular/common";
import { routes } from "./app-routing.module";
// import { environment } from "src/environments/environment";
// import { AngularFireModule } from "@angular/fire/compat";
// import { AuthGuard } from "./auth-guard.service";
// import { TodoComponent } from "./todo/todo.component";

// describe("App-Routing", () => {
//   let router: Router;
//   let location: Location;

//   //const canActivateStub:CanActivateFn = () => {return router.navigate(["/auth/login"])};
//   // const routes: Routes = [
//   //   { path: "", redirectTo: "/dashboard", pathMatch: "full" },
//   //   {
//   //     path: "dashboard",
//   //     component: DashboardComponent,
//   //     canActivate: [AuthGuard],
//   //     children: [{ path: "", component: TodoComponent }],
//   //   },
//   // ];
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule.withRoutes(routes),
//          AngularFireModule.initializeApp(environment.firebase),
//       ],
//     //  providers:[{provide: AuthGuard, useValue:canActivateStub}],
//       declarations: [DashboardComponent],
//     });

//     router = TestBed.inject(Router);
//     location = TestBed.inject(Location);
//     router.initialNavigation();
//   });

//   it('navigate to "" redirects you to /dashboard', fakeAsync(() => {
//     router.navigate([""]);
//     jasmine.createSpy('canActivateFn').and.returnValue(router.navigate(["/auth/login"]));
//     tick();
//     expect(location.path()).toBe("/dashboard");
//     flush();
//     //console.log(location.path());
//   }));
// });

describe('Routes', () => {
  it('should have a redirect route for empty path', () => {
    const redirectRoute = routes.find(route => route.path === '' && route.redirectTo === '/dashboard');
    expect(redirectRoute).toBeDefined();
  });

  it('should have an "auth" route with canActivate', () => {
    const authRoute = routes.find(route => route.path === 'auth' && route.canActivate !== undefined);
    expect(authRoute).toBeDefined();
  });

  it('should have "auth" route children', () => {
    const authRoute = routes.find(route => route.path === 'auth');
    expect(authRoute?.children).toBeDefined();
    expect(authRoute?.children?.length).toBeGreaterThan(0);
  });

  it('should have a route for "login" under "auth"', () => {
    const authRoute = routes.find(route => route.path === 'auth');
    const loginRoute = authRoute?.children?.find((route) => route.path === 'login');
    console.log(loginRoute);

    expect(loginRoute).toBeDefined();
    expect(loginRoute?.component).toBeDefined();
  });

  it('should have a route for "signup" under "auth"', () => {
    const authRoute = routes.find(route => route.path === 'auth');
    const signupRoute = authRoute?.children?.find(route => route.path === 'signup');
    expect(signupRoute).toBeDefined();
    expect(signupRoute?.component).toBeDefined();
  });

  it('should have a route for "forgot-password" under "auth"', () => {
    const authRoute = routes.find(route => route.path === 'auth');
    const forgotPasswordRoute = authRoute?.children?.find(route => route.path === 'forgot-password');
    expect(forgotPasswordRoute).toBeDefined();
    expect(forgotPasswordRoute?.component).toBeDefined();
  });

  it('should have a "dashboard" route with canActivate', () => {
    const dashboardRoute = routes.find(route => route.path === 'dashboard' && route.canActivate !== undefined);
    expect(dashboardRoute).toBeDefined();
  });

  it('should have "dashboard" route children', () => {
    const dashboardRoute = routes.find(route => route.path === 'dashboard');
    expect(dashboardRoute?.children).toBeDefined();
    expect(dashboardRoute?.children?.length).toBeGreaterThan(0);
  });

  it('should have a route for "ang-tables" under "dashboard"', () => {
    const dashboardRoute = routes.find(route => route.path === 'dashboard');
    const angTablesRoute = dashboardRoute?.children?.find(route => route.path === 'ang-tables');
    expect(angTablesRoute).toBeDefined();
    expect(angTablesRoute?.loadChildren).toBeDefined();
  });

  it('should have a route for "charts" under "dashboard"', () => {
    const dashboardRoute = routes.find(route => route.path === 'dashboard');
    const chartsRoute = dashboardRoute?.children?.find(route => route.path === 'charts');
    expect(chartsRoute).toBeDefined();
    expect(chartsRoute?.loadChildren).toBeDefined();
  });

  it('should have a route for "not-found"', () => {
    const notFoundRoute = routes.find(route => route.path === 'not-found');
    expect(notFoundRoute).toBeDefined();
    expect(notFoundRoute?.component).toBeDefined();
  });

  it('should have a fallback route for any other paths', () => {
    const fallbackRoute = routes.find(route => route.path === '**' && route.redirectTo === 'not-found');
    expect(fallbackRoute).toBeDefined();
  });
});
