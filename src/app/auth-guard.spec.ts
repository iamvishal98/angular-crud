import { AuthGuard } from './auth-guard.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, CanActivateFn, ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('AuthGuard', () => {
    // let authGuard: typeOf AuthGuard;
    let authService: AuthService;
    let router: Router;
    // let route: ActivatedRouteSnapshot;
    // let state: RouterStateSnapshot;
   // let authguard: typeof AuthGuard;
    // let activatedRoute: ActivatedRoute;
    let activatedRouteSnapshot: ActivatedRouteSnapshot;
    let routeStateSnapshot: RouterStateSnapshot;

     beforeEach(() => {
        TestBed.configureTestingModule({
      imports:[AngularFireModule.initializeApp(environment.firebase),]
        });

   
 })



// it('should allow navigation when logged in', () => {
//     spyOnProperty(AuthService.prototype, 'loggedIn', 'get').and.returnValue(true); 

//     // const canActivateResult = authguard(
//     //     activatedRouteSnapshot,
//     //     routeStateSnapshot
//     // );
//     // expect(canActivateResult).toBe(true);
//   });

// it('should return true if the user is logged in ', fakeAsync(async () => {
//     const mockLoggedIn=spyOnProperty(AuthService.prototype, 'loggedIn', 'get').and.returnValue(true); 
//     const authenticated = await runAuthGuardWithContext(getAuthGuardWithDummyUrl('/dashhboard'))
//     expect(authenticated).toBeTruthy();
//     flush();
//   }))

  function getAuthGuardWithDummyUrl(urlPath: string): () => boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    const dummyRoute = new ActivatedRouteSnapshot( )
    dummyRoute.url = [ new UrlSegment(urlPath, {}) ]
    const dummyState: RouterStateSnapshot = { url: urlPath, root:  new ActivatedRouteSnapshot() }
    return () => AuthGuard(dummyRoute, dummyState)
  }


  async function runAuthGuardWithContext(authGuard: () => boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>): Promise<boolean | UrlTree> {
    const result = TestBed.runInInjectionContext(authGuard)
    const authenticated = result instanceof Observable ? await handleObservableResult(result) : result;
    return authenticated
  }

  function handleObservableResult(result: Observable<boolean | UrlTree>): Promise<boolean | UrlTree> {
    return new Promise<boolean | UrlTree>((resolve) => {
      result.subscribe((value) => {
        resolve(value);
      });
    });
  }     

})

