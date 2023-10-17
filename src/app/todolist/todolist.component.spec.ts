import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TodolistComponent } from "./todolist.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AntdModule } from "../ant.module";
import { TodoList } from "../Interface";
import { first } from "rxjs/operators";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("TodolistComponent", () => {
  let component: TodolistComponent;
  let fixture: ComponentFixture<TodolistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodolistComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule, AntdModule, BrowserAnimationsModule],
    });
    fixture = TestBed.createComponent(TodolistComponent);
    component = fixture.componentInstance;
    component.todoData = [];
    fixture.detectChanges();
  });

  describe("COMPONENT CREATION", () => {
    it("should create component", () => {
      expect(component).toBeTruthy();
    });

  });

  describe("INPUT: GETTING TO-DO", () => {
    it("gets the to-dos", () => {
      component.todoData = [
        {
          completed: false,
          createdOn: new Date(),
          description: "taks#2rege",
          id: "NfUuFlnCKhwzl26lbZO",
        },
      ];
      expect(
        fixture.nativeElement.querySelectorAll("nz-table tbody tr").length
      ).toEqual(1);
    });

    it("should the description is empty is should render '-", () => {
      let task:TodoList =  {
        completed: false,
        createdOn: new Date(),
        description: "",
        id: "NfUuFlnCKhwzl26lbZO",
      }
      component.todoData = [task];

      fixture.detectChanges();
     
      const desc=fixture.nativeElement.querySelector("nz-table tbody tr td");

      
      expect(desc.textContent).toEqual("-");
   
      
      
    })
  });

  describe("OUTPUT: DELETE", () => {
    it("should emit task to be deleted", () => {
      let tobeDeletedToDo!: TodoList;
      component.todoData = [
        {
          completed: false,
          createdOn: new Date(),
          description: "taks#2rege",
          id: "NfUuFlnCKhwzl26lbZO",
        },
      ];

      fixture.detectChanges();
      component.deleteData.subscribe((val: TodoList) => {
        tobeDeletedToDo = val;
      });
      const deleteBtn = fixture.nativeElement.querySelector(".delete-btn");
      deleteBtn.click();
      let doc = fixture.nativeElement.ownerDocument;
      let btn = doc.querySelector(
        ".ant-popover-content .ant-popover-buttons .ant-btn-primary"
      );
      btn.click();
      // expect(tobeDeletedToDo).toEqual(component.todoData[0]);
      expect(tobeDeletedToDo).toEqual(component.todoData[0]);
    });
  });

  describe("OUTPUT: MARK TASK", () => {
    it("Mark as complete", () => {
      component.todoData = [
        {
          completed: false,
          createdOn: new Date(),
          description: "taks#2rege",
          id: "NfUuFlnCKhwzl26lbZO",
        },
      ];

      let checkedData = {
        completed: true,
        createdOn: new Date(),
        description: "taks#2rege",
        id: "NfUuFlnCKhwzl26lbZO",
      };

      let data: any;

      fixture.detectChanges();

      component.completedTask.subscribe((value: TodoList) => {
        data = value;
      });

      const checkBtn = fixture.nativeElement.querySelector(".check-btn");
      checkBtn.click();
      expect(data).toEqual(checkedData);
    });

    it("Mark as incomplete", () => {
      component.todoData = [
        {
          completed: true,
          createdOn: new Date(),
          description: "taks#2rege",
          id: "NfUuFlnCKhwzl26lbZO",
        },
      ];

      let checkedData = {
        completed: false,
        createdOn: new Date(),
        description: "taks#2rege",
        id: "NfUuFlnCKhwzl26lbZO",
      };

      let data: any;
      fixture.detectChanges();
      component.completedTask.pipe(first()).subscribe((value: TodoList) => {
        data = value;
      });

      component.checkhandler(component.todoData[0]);
      expect(data).toEqual(checkedData);
    });
  });

  describe("OUTPUT: EDIT TASK ", () => {

    it("should emit task to be edited",() => {
      component.todoData = [
        {
          completed: false,
          createdOn: new Date(),
          description: "taks#2rege",
          id: "NfUuFlnCKhwzl26lbZO",
        },
      ];

      fixture.detectChanges();
  
      component.openModal.pipe(first()).subscribe((task: TodoList) => {
        expect(task).toEqual(component.todoData[0]);
      });
  
      component.modalHandler(component.todoData[0]);

    })
  });
});
