import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { IAuth } from "../Interface";
import { Router } from "@angular/router";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent {
  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    email: ["", [Validators.required]],
    password: ["", [Validators.required]],
  });

  user!: any;

  async submitForm(): Promise<void> {
    if (this.validateForm.valid) {
      this.authService.Login(this.validateForm.value as IAuth);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleNavigationRegister() {
    this.router.navigate(["/auth/signup"]);
  }

  handleNavigationReset() {
    this.router.navigate(["/auth/forgot-password"]);
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
}
