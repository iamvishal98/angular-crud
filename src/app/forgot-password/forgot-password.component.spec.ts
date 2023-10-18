import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AntdModule } from '../ant.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let router:Router;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      imports:[ReactiveFormsModule,AngularFireModule.initializeApp(environment.firebase),AntdModule],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('FORMS',() => {
    it('should create form',() => {
      let form = fixture.nativeElement.querySelector('form');
      expect(form).toBeTruthy();
    });
    it('form should have email control',() => {
      let emailControl = component.validateForm.get('email');
      expect(emailControl).toBeTruthy();
    });
    it('email should have default value as empty string',() => {
      let emailControl = component.validateForm.get('email');
      expect(emailControl?.value).toEqual('');
    });
    it('should call the submitForm method when the form is submitted',() => {
      spyOn(component, 'submitForm');
      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('submit',null)
      expect(component.submitForm).toHaveBeenCalled();
    });
    it('should be valid if email control is valid',() => {
      component.validateForm.setValue({
        email:'test@test.com'
      });
      fixture.detectChanges();
      expect(component.validateForm.valid).toEqual(true);
    });
    it('should be invalid if email control is invalid',() => {
      component.validateForm.setValue({
        email:''
      });
      fixture.detectChanges();
      expect(component.validateForm.valid).toEqual(false);
    });

  });
  describe('METHODS',() => {
    it('should call resetPassword() when validateForm is valid', () => {
      spyOn(authService, 'resetPassword');
     component.validateForm.setValue({
      email:'test@test.com',
     });
      component.submitForm();
      expect(authService.resetPassword).toHaveBeenCalledWith(component.validateForm.value.email as string);
    });
    it('should mark all controls as dirty and update their validity when validateForm is invalid', () => {
      component.validateForm.setValue({
        email:'',
       });
       component.submitForm();
       expect(component.validateForm.dirty).toBeTruthy();
    });
    it("handleNaviagtionHome()", () => {
      let mockStorage = spyOn(window.localStorage,'removeItem').and.callFake((key : string) => {return key});
      const routerSpy = spyOn(router, "navigate");
      component.handleNaviagtionHome();
      expect(routerSpy).toHaveBeenCalledWith(["/auth/login"]);
      expect(mockStorage).toHaveBeenCalledWith('isSuccess')
    });
    
  });
});
