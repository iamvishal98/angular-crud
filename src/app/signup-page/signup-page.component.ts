import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { ISignUp } from "../Interface";
import { Router } from "@angular/router";
import { MessageService } from "../services/message.service";

@Component({
  selector: "app-signup-page",
  templateUrl: "./signup-page.component.html",
  styleUrls: ["./signup-page.component.scss"],
})
export class SignupPageComponent {
  validateForm: FormGroup<{
    displayName: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirmpassword: FormControl<string>;
  }> = this.fb.group({
    displayName: ["", [Validators.required]],
    email: ["", [Validators.required,Validators.email]],
    password: ["", [Validators.required,Validators.pattern(/^(?=.*[A-Z]).{6,}$/)]],
    confirmpassword: ["", [Validators.required]],
  });

  user!: any;

  async submitForm(): Promise<void> {
    if (this.validateForm.valid) {
      if (
        this.validateForm.value.confirmpassword ===
        this.validateForm.value.password
      )
        this.authService.Signup(this.validateForm.value as ISignUp);
      else this.messageService.errorMessage("passowrds did not match");
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleNavigation() {
    this.router.navigate(["/auth/login"]);
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}
}
