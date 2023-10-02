import { Injectable } from "@angular/core";
import { IAuth, ICurrentUser, ISignUp } from "../Interface";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { MessageService } from "./message.service";

interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private messageService: MessageService
  ) {}

  get loggedIn(): boolean {
    return JSON.parse(localStorage.getItem("isUserLoggedIn")!) || false;
  }
  currentuser!: ICurrentUser | null;

  Signup(data: ISignUp) {
    this.fireauth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((resp) => {
        resp.user?.updateProfile({
          displayName: data.displayName,
        });
        this.router.navigate(["/auth/login"]);
      })
      .catch((error) => this.messageService.errorMessage(error));
  }

  Login(data: IAuth) {
    this.fireauth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((resp) => {
        this.currentuser = {
          displayName: resp.user?.displayName,
          email: resp.user?.email,
          uid: resp.user?.uid,
        };
        localStorage.setItem("isUserLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(this.currentuser));
        this.router.navigate(["/dashboard"]);
      })
      .catch((error) =>
        this.messageService.errorMessage("Inavlid Credentials")
      );
  }

  Signout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem("isUserLoggedIn");
      localStorage.removeItem("user");
      this.router.navigate(["/auth/login"]);
    });
  }

  resetPassword(email: string) {
    this.fireauth
      .sendPasswordResetEmail(email)
      .then((resp) => localStorage.setItem("isSuccess", JSON.stringify(true)))
      .catch((error) => {
        this.messageService.errorMessage(error);
        localStorage.setItem("isSuccess", JSON.stringify(false));
      });
  }
}
