import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';
import { Router } from '@angular/router';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageNotFoundComponent]
    });
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call backToHome on btn click', () => {
    const btn = fixture.nativeElement.querySelector('button');
    spyOn(component, 'backToHome');
    btn.click();
    fixture.detectChanges();
    expect(component.backToHome).toHaveBeenCalled();
  });
  it('should navigate to "/"', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.backToHome();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
