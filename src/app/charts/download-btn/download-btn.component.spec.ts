import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DownloadBtnComponent } from './download-btn.component';
import { AntdModule } from 'src/app/ant.module';

describe('DownloadBtnComponent', () => {
  let component: DownloadBtnComponent;
  let fixture: ComponentFixture<DownloadBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[AntdModule],
      declarations: [DownloadBtnComponent],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(DownloadBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
