import { TestBed, async, fakeAsync, flush, tick } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { ISignUp } from "../Interface";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginPageComponent } from "../login-page/login-page.component";
import { MessageService } from "./message.service";

describe("Auth-Service", () => {
  let authService: AuthService;
  let messageService:MessageService;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule.withRoutes([
          { path: "dashboard", component: DashboardComponent },
          {path:'auth/login',component:LoginPageComponent}
        ]),
        BrowserAnimationsModule,
      ],
    }).compileComponents();
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    messageService= TestBed.inject(MessageService);
  });

  let user = { displayName: "John", email: "john@example.com", uid: "123" };
  const mockRes = Promise.resolve({
    credential: null,
    user: user,
  });

  it("returns true when isUserLoggedIn is true in localStorage", () => {
    let localStorageMock = spyOn(
      window.localStorage,
      "getItem"
    ).and.returnValue("true");
    let result = authService.loggedIn;
    expect(result).toBeTrue();
  });

  it("returns false when isUserLoggedIn is not in localStorage", () => {
    let localStorageMock = spyOn(
      window.localStorage,
      "getItem"
    ).and.returnValue(null);
    let result = authService.loggedIn;
    expect(result).toBeFalse();
  });

  it("SingUp()", fakeAsync(() => {
    const mockSingUpRes = Promise.resolve({
        credential: null,
        user:{
            updateProfile: jasmine.createSpy('updateProfile').and.callFake(() =>{})
        }
    })
    spyOn(
      authService["fireauth"],
      "createUserWithEmailAndPassword"
    ).and.returnValue(mockSingUpRes as unknown as Promise<any>);
    authService.Signup({
      email: "john@example.com",
      password: "123",
      displayName: "John",
    });
    tick();
    expect(authService["fireauth"].createUserWithEmailAndPassword).toHaveBeenCalled();
    authService["fireauth"].createUserWithEmailAndPassword("john@example.com","123").then((resp) => {
        expect(resp.user?.updateProfile).toHaveBeenCalledWith({displayName:'John'});
    })
      
  }));

  it('Singup() Reject',fakeAsync(() => {
    spyOn(
        authService["fireauth"],
        "createUserWithEmailAndPassword"
      ).and.returnValue(Promise.reject("Error"));
      spyOn(messageService,'errorMessage');
      authService.Signup({
        email: "john@example.com",
        password: "123",
        displayName: "John",
      });
      tick();
     expect(messageService.errorMessage).toHaveBeenCalledWith("Error");
      
  }))

  it("Login()", fakeAsync(() => {
    spyOn(
      authService["fireauth"],
      "signInWithEmailAndPassword"
    ).and.returnValue(mockRes as unknown as Promise<any>);
    spyOn(window.localStorage, "setItem").and.returnValue(void 0);
    spyOn(router, "navigate");
    authService.Login({ email: "john@example.com", password: "123" });
    expect(
      authService["fireauth"].signInWithEmailAndPassword
    ).toHaveBeenCalled();
    tick();
    expect(authService.currentuser).toEqual(user);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(router.navigate).toHaveBeenCalledWith(["/dashboard"]);
  }));

  it("Login() Reject", fakeAsync(() => {
    spyOn(
      authService["fireauth"],
      "signInWithEmailAndPassword"
    ).and.returnValue(Promise.reject("Error"));
    spyOn(messageService, "errorMessage");

    authService.Login({ email: "john@example.com", password: "123" });
    tick();

    expect(messageService.errorMessage).toHaveBeenCalledWith("Inavlid Credentials");
  }))

  it("Signout()", fakeAsync(() => {
    let mockSingOutRes=  Promise.resolve()
    spyOn(authService["fireauth"], "signOut").and.returnValue(mockSingOutRes);
    spyOn(router, "navigate");
    spyOn(window.localStorage,'removeItem');
    authService.Signout();
    expect(authService["fireauth"].signOut).toHaveBeenCalled();
    tick();
    expect(localStorage.removeItem).toHaveBeenCalledTimes(2);
    expect(router.navigate).toHaveBeenCalledWith(["/auth/login"]);
  }));

  it("Signout() Reject", fakeAsync(() => {
    spyOn(authService["fireauth"], "signOut").and.returnValue(Promise.reject("Error"));
    spyOn(messageService, "errorMessage");
    authService.Signout();
    tick();
    expect(messageService.errorMessage).toHaveBeenCalledWith("Error");
  }));

  it("resetPassword()", fakeAsync(() => {
    spyOn(authService["fireauth"], "sendPasswordResetEmail").and.returnValue(Promise.resolve());
    spyOn(window.localStorage,'setItem');
    authService.resetPassword("john@example.com");
    expect(authService["fireauth"].sendPasswordResetEmail).toHaveBeenCalled();
    tick();
    expect(localStorage.setItem).toHaveBeenCalledWith('isSuccess',JSON.stringify(true));
   
  }));

  it('resetPassword() Reject',fakeAsync(() => {
    spyOn(authService["fireauth"], "sendPasswordResetEmail").and.returnValue(Promise.reject("Error"));
    spyOn(messageService,'errorMessage');
    spyOn(window.localStorage,'setItem');
    authService.resetPassword("john@example.com");
    tick();
    expect(messageService.errorMessage).toHaveBeenCalledWith("Error");
    expect(localStorage.setItem).toHaveBeenCalled();
  }))
});
