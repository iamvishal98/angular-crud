import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TodoComponent } from "./todo.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AntdModule } from "../ant.module";
import { ApiService } from "../services/api.service";
import { ICurrentUser, TodoList } from "../Interface";
import { Observable, Subject } from "rxjs";

// const todos = [
//   {
//     "-NfUuFlnCKhwzl26lbZO": {
//       completed: false,
//       createdOn: "2023-09-29T07:48:26.228Z",
//       description: "taks#1",
//       id: "this.index",
//     },
//     "-NfVRfS27prWO8MzAXaI": {
//       completed: false,
//       createdOn: "2023-09-29T10:18:49.132Z",
//       description: "task#2",
//       id: "this.index",
//     },
//   },
// ];
// const okResponse = new Response(JSON.stringify(todos), {
//   status: 200,
//   statusText: "OK",
// });

describe("TodoComponent", () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  // let service: ApiService;
  const getTodoSubject = new Subject<{ id: string; description: string; createdOn: Date; completed: boolean; }[]>();
  const mockApiService = jasmine.createSpyObj<ApiService>("ApiService", {
    getToDo: getTodoSubject.asObservable(),
  });

  const mockService = {
    getToDo: jasmine.createSpy('getToDo').and.returnValue(getTodoSubject)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        AntdModule,
      ],
      declarations: [TodoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers:[{provide:ApiService, useValue: mockApiService}]
    }).compileComponents();
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    // service = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call fetchData fn", () => {
    const componentSpy = spyOn(component, "fetchData");
    component.ngOnInit();
    expect(componentSpy).toHaveBeenCalled();
    expect(mockApiService.getToDo).toHaveBeenCalled();
  });

  it("clicking on Add Btn should call submitform fn", () => {
    const componentSpy = spyOn(component, "submitForm");
    const addTaskbutton =
      fixture.nativeElement.querySelector(".login-form-button");
    addTaskbutton.click();
    expect(componentSpy).toHaveBeenCalled();
    //console.log(addTaskbutton);
  });

  it("fetch fn should intialize data",  () => {
    const todos :  TodoList[] = [
      {
        completed: false,
        createdOn: new Date(),
        description: "taks#1",
        id: "-NfUuFlnCKhwzl26lbZO",
      },
      {
        completed: false,
        createdOn: new Date(),
        description: "task#2",
        id: "-NfVRfS27prWO8MzAXaI",
      },
    ];
    component.fetchData();
    getTodoSubject.next(todos);
    expect(component.listOfData).toEqual(todos)
    
  });
});
