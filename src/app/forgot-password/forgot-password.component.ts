import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent {
  validateForm: FormGroup<{
    email: FormControl<string>;
  }> = this.fb.group({
    email: ["", [Validators.required]],
  });

  get isSuccess(): boolean {
    return false || JSON.parse(localStorage.getItem("isSuccess")!);
  }

  async submitForm(): Promise<void> {
    if (this.validateForm.valid) {
      this.authService.resetPassword(this.validateForm.value.email as string);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleNaviagtionHome() {
    this.router.navigate(["/auth/login"]);
    localStorage.removeItem("isSuccess");
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
}
