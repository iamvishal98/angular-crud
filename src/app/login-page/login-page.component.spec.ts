import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzFormDirective } from 'ng-zorro-antd/form';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { AntdModule } from '../ant.module';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IAuth } from '../Interface';
import { By } from '@angular/platform-browser';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let router:Router
  let authService: AuthService
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule,AngularFireModule.initializeApp(environment.firebase),AntdModule],
      declarations: [LoginPageComponent, NzFormDirective],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  describe('Intialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it("form should create", () => {
      let form = fixture.debugElement.query(By.directive(NzFormDirective)); //.nativeElement.querySelector("form");
      expect(form).toBeTruthy();
    });
    it('should have a form with username and password controls', () => {
      const emailControl = component.validateForm.get('email');
      const passwordControl = component.validateForm.get('password');
      
      expect(emailControl).toBeTruthy();
      expect(passwordControl).toBeTruthy();
    });
    it('should initialize username and password to empty strings', () => {
      expect(component.validateForm.value.email).toEqual('');
      expect(component.validateForm.value.password).toEqual('');
    });
    it('should call the submitForm method when the form is submitted', () => {
      spyOn(component, 'submitForm');
      const form = fixture.debugElement.query(By.css('form'));

      form.triggerEventHandler('submit', null);

      expect(component.submitForm).toHaveBeenCalled();
    });
  });
 
  describe('Method Chaining',() => {
    describe("handleNavigationReset", () => {
      it("should navigate to /auth/forgot-password", () => {
        const routerSpy = spyOn(router, "navigate");
    
        component.handleNavigationReset();
    
        expect(routerSpy).toHaveBeenCalledWith(["/auth/forgot-password"]);
      });
    });
    describe("handleNavigationRegister", () => {
      it("should navigate to /auth/signup", () => {
        const routerSpy = spyOn(router, "navigate");
    
        component.handleNavigationRegister();
    
        expect(routerSpy).toHaveBeenCalledWith(["/auth/signup"]);
      });
    });
    describe("submitForm",() => {
      it('should call authService.Login when validateForm is valid', () => {
         spyOn(authService, 'Login');
        component.validateForm.setValue({
         email:'test@test.com',
         password:'123456'
        });
         component.submitForm();
         expect(authService.Login).toHaveBeenCalledWith(component.validateForm.value as IAuth);
      });
      it('should mark all controls as dirty and update their validity when validateForm is invalid', () => {
        component.validateForm.setValue({
          email:'',
          password:''
         });
         component.submitForm();
         expect(component.validateForm.dirty).toBeTruthy();
        });
    })

  });

  describe("Form Validations", () => {
    it("should have valid if both form values are valid", () => {
      component.validateForm.setValue({
        email:'test@test.com',
        password:'123456'
      });
      fixture.detectChanges();
      expect(component.validateForm.valid).toEqual(true);
    });

    it("should be invalid if form values are invalid", () => {
      component.validateForm.setValue({
        email:'',
        password:''
      });
      fixture.detectChanges();
      expect(component.validateForm.valid).toEqual(false);
      //expect(component.validateForm.updateValueAndValidity).toHaveBeenCalledWith({ onlySelf: true })
    });
    it("should not be valid if one of  form value is invalid", () => {
      component.validateForm.setValue({
        email:'test@test.com',
        password:''
      });
      fixture.detectChanges();
      expect(component.validateForm.valid).toEqual(false);
    });
  });
});
