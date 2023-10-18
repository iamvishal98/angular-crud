import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { of } from 'rxjs';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let router: Router;
  let route: ActivatedRoute
  let apiService: ApiService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ RouterTestingModule,HttpClientTestingModule],
      declarations: [UserComponent]
    });
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    apiService  =TestBed.inject(ApiService);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Default Values',() => {
    expect(component.user).toBeUndefined();
    expect(component.userId).toBeUndefined();
  });
  it('should navigate to "dashboard/ang-tables"', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.handleNavigation();
    expect(navigateSpy).toHaveBeenCalledWith(['dashboard/ang-tables']);
  });
  it('should set userId from route params', () => {
    route.snapshot.params['id'] = '123';
    component.ngOnInit();
    expect(component.userId).toBe('123');
  });
  it('should fetch user data from apiService', () => {
    const response = { name: 'John Doe' };
    spyOn(apiService, 'fetchUserData').and.returnValue(of(response));
    component.ngOnInit();
    expect(apiService.fetchUserData).toHaveBeenCalledWith(component.userId);
  });
  it('should set user data if response is truthy', () => {
    const response = { name: 'John Doe' };
    spyOn(apiService, 'fetchUserData').and.returnValue(of(response));

    component.ngOnInit();

    expect(component.user).toBe(response);
  });

});
