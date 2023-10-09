import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TodoComponent } from './todo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AntdModule } from '../ant.module';
import { ApiService } from '../services/api.service';

const todos = [
  {
    "-NfUuFlnCKhwzl26lbZO" : {
      "completed" : false,
      "createdOn" : "2023-09-29T07:48:26.228Z",
      "description" : "taks#1",
      "id" : "this.index"
    },
    "-NfVRfS27prWO8MzAXaI" : {
      "completed" : false,
      "createdOn" : "2023-09-29T10:18:49.132Z",
      "description" : "task#2",
      "id" : "this.index"
    }
  }
];
const okResponse = new Response(JSON.stringify(todos), {
  status: 200,
  statusText: 'OK',
});



describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, FormsModule, ReactiveFormsModule, AntdModule],
      declarations: [TodoComponent],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('gets the to-dos', async () => {
    /* … */
    let apiService:ApiService;
    const fetchSpy = jasmine.createSpy('fetch').and.returnValue(okResponse);
   // const todoService = new apiService(fetchSpy);

  });
});
