import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TodoComponent } from "./todo.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AntdModule } from "../ant.module";
import { ApiService } from "../services/api.service";
import { TodoList } from "../Interface";
import { of } from "rxjs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { throwError } from 'rxjs';
import { NzFormDirective } from "ng-zorro-antd/form";
import { MessageService } from "../services/message.service";

describe("TodoComponent", () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let service: ApiService;
  let message: MessageService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        AntdModule,
        BrowserAnimationsModule,
      ],
      declarations: [TodoComponent,NzFormDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ApiService);
    message = TestBed.inject(MessageService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("clicking on Add Btn should call submitform fn", () => {
    const componentSpy = spyOn(component, "submitForm");
    const addTaskbutton =
      fixture.nativeElement.querySelector(".login-form-button");
    addTaskbutton.click();
    expect(componentSpy).toHaveBeenCalled();
  });

  describe("FORMS", () => {
    it("SHOULD CREATE FORM COMPONENT", () => {
      const form = fixture.nativeElement.querySelector("form");
      expect(form).toBeTruthy();
    });

    it("SHOULD HAVE A NON EMPTY TO-DO [description]", () => {
      let description = component.validateForm.controls['description'];
      expect(description.valid).toBeFalsy();
      expect(description.pristine).toBeTruthy();
      description.setValue('');
      fixture.detectChanges();
      expect(description.valid).toBeFalsy();
    });

    it("SHOULD BE VALID IF TO-DO [description] IS VALID", () => {
      let description = component.validateForm.controls['description'];
      description.setValue('test');
      fixture.detectChanges();
      expect(description.valid).toBeTruthy();
    });

    it("[FORM-CHECK] CHECK IF FORM IS INVALID WHEN NO VALUES ARE PRESENT ",() => {
      expect(component.validateForm.valid).toBeFalsy();
    })
    
    it("[FORM-CHECK] CHECK IF FORM IS VALID WHEN VALUES ARE PRESENT ",() => {
      component.validateForm.setValue({
        description:'Test'
      });
      fixture.detectChanges();
      expect(component.validateForm.valid).toBeTruthy();
    })

    it("[FORM-CHECK] CHECK IF FORM IS MAKRED AS DIRTY WHEN NO VALUES ARE PRESENT ",() => {
        let description = component.validateForm.controls['description'];
        description.setValue('');
        fixture.detectChanges();
        component.submitForm()
        expect(component.validateForm.dirty).toBeTruthy();
     })


    
  });

  describe("GET TODO METHOD", () => {
    const todos: TodoList[] = [
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
    it("getToDo() SUBSCRIBE METHOD", fakeAsync(() => {
      const getToDoSpy = spyOn(service, "getToDo").and.returnValue(of(todos));
      const subSpy = spyOn(service.getToDo(), "subscribe");
      component.fetchData();
      tick();
      expect(getToDoSpy).toHaveBeenCalledBefore(subSpy);
      expect(subSpy).toHaveBeenCalled();
    }));

    it("TESTING EXECUTION WITHIN SUBSCRIBE METHOD", fakeAsync(() => {
      spyOn(service, "getToDo").and.returnValue(of(todos));
      expect(component.isDataLoading).toBeTruthy();

      component.ngOnInit();

      expect(component.listOfData).toBeDefined();
      expect(component.listOfData.length).toBe(2);
      expect(component.isDataLoading).toBeFalsy();
    }));

    it("GET TODO METHOD FAILED",() => {
      const errResponse = '404 not found'
      const getToDoSpy = spyOn(service, "getToDo").and.returnValue(throwError(errResponse));
      const errorMsgSpy = spyOn(message,'errorMessage').withArgs(errResponse).and.returnValue(void 0);

      expect(component.isDataLoading).toBeTruthy();
      component.fetchData();
      expect(getToDoSpy).toHaveBeenCalled();
      expect(errorMsgSpy).toHaveBeenCalledWith(errResponse);
      expect(component.isDataLoading).toBeFalsy();
    })
  });

  describe("ADD TODO METHOD", () => {
    let task: TodoList = {
      id: "-sdjberjbvgsjdgwr",
      description: "Task#Test",
      completed: false,
      createdOn: new Date(),
    };

    beforeEach(() => {
      component.validateForm.setValue({
        description: "Task#Test",
      });
      fixture.detectChanges();
    });

    it("addtToDo() METHOD IS BEING CALLED  ON submitForm() METHOD ", () => {
      const addTaskSpy = spyOn(service, "addToDo").and.returnValue(
        of({ name: "-sdjberjbvgsjdgwr" })
      );
      component.submitForm();
      expect(addTaskSpy).toHaveBeenCalled();
    });

    it("addToDO() SUBSCRIBE METHOD", fakeAsync(() => {
      const addTaskSpy = spyOn(service, "addToDo").and.returnValue(
        of({ name: "-sdjberjbvgsjdgwr" })
      );
      const subSpy = spyOn(service.addToDo(task), "subscribe");
      component.submitForm();
      expect(addTaskSpy).toHaveBeenCalledBefore(subSpy);
      expect(subSpy).toHaveBeenCalled();
    }));

    it("TESTING EXECUTION WITHIN SUBSCRIBE METHOD", () => {
      const addTaskSpy = spyOn(service, "addToDo").and.returnValue(
        of({ name: "-sdjberjbvgsjdgwr" })
      );
      const fetchDataSpy = spyOn(component, "fetchData");
      component.submitForm();
      expect(fetchDataSpy).toHaveBeenCalled();
      expect(addTaskSpy).toHaveBeenCalled();
    });

    it("SHOULD CALL addtToDo()  ONLY 1 TIME ", () => {
      const addTaskSpy = spyOn(service, "addToDo").and.returnValue(
        of({ name: "-sdjberjbvgsjdgwr" })
      );

      component.submitForm();
      expect(addTaskSpy).toHaveBeenCalledTimes(1);
    });

    it("addToDo() METHOD FAILED",() => {
      const errResponse = 'something went wrong'
      const addToDoSpy = spyOn(service, "addToDo").and.returnValue(throwError(errResponse));
      const errorMsgSpy = spyOn(message,'errorMessage').withArgs(errResponse).and.returnValue(void 0);

      component.submitForm()
      expect(addToDoSpy).toHaveBeenCalled()
      expect(errorMsgSpy).toHaveBeenCalledWith(errResponse);
    })
  });

  describe("DELETE TODO METHOD", () => {
    let task: TodoList = {
      id: "-sdjberjbvgsjdgwr",
      description: "Task#Test",
      completed: false,
      createdOn: new Date(),
    };
    it("deleteData() SUBSCRIBE METHOD", fakeAsync(() => {
      const deleteToDoSpy = spyOn(service, "deleteToDo").and.returnValue(
        of(null)
      );
      const subSpy = spyOn(service.deleteToDo(task.id), "subscribe");
      component.deleteData(task);
      tick();
      expect(deleteToDoSpy).toHaveBeenCalledBefore(subSpy);
      expect(subSpy).toHaveBeenCalled();
    }));

    it("TESTING EXECUTION WITHIN SUBSCRIBE METHOD", () => {
      const deleteToDoSpy = spyOn(service, "deleteToDo").and.returnValue(
        of(null)
      );
      const fetchDataSpy = spyOn(component, "fetchData");
      component.deleteData(task);
      expect(deleteToDoSpy).toHaveBeenCalled();
      expect(fetchDataSpy).toHaveBeenCalled();
    });

    it("deleteToDo() SHOULD ONLY BE CALLED 1 TIME", () => {
      const deleteToDoSpy = spyOn(service, "deleteToDo").and.returnValue(
        of(null)
      );
      component.deleteData(task);
      expect(deleteToDoSpy).toHaveBeenCalledTimes(1);
    });

    it("deleteToDo() METHOD FAILED",() => {
      const errResponse = 'something went wrong'
      const deleteToDoSpy = spyOn(service, "deleteToDo").and.returnValue(throwError(errResponse));
      const errorMsgSpy = spyOn(message,'errorMessage').withArgs(errResponse).and.returnValue(void 0);

      component.deleteData(task)
      expect(deleteToDoSpy).toHaveBeenCalled()
      expect(errorMsgSpy).toHaveBeenCalledWith(errResponse);
    }) 
  });

  describe("UPDATE TODO METHOD", () => {
    let task: TodoList = {
      id: "-sdjberjbvgsjdgwr",
      description: "Task#Test",
      completed: false,
      createdOn: new Date(),
    };

    it("handleUpdate() SHOULD CALLED editToDO()", () => {
      const editToDOSpy = spyOn(service, "editToDO").and.returnValue(
        of({ description: "editToDO" })
      );
      component.handleUpdate(task);
      expect(editToDOSpy).toHaveBeenCalled();
    });

    it("editToDo() SUBSCRIBE METHOD", () => {
      const editToDOSpy = spyOn(service, "editToDO").and.returnValue(
        of({ description: "editToDO" })
      );
      const subSpy = spyOn(service.editToDO(task), "subscribe");

      component.handleUpdate(task);
      expect(editToDOSpy).toHaveBeenCalledBefore(subSpy);
      expect(subSpy).toHaveBeenCalled();
    });

    it("TESTING EXECUTION WITHIN SUBSCRIBE METHOD", () => {
      const editToDOSpy = spyOn(service, "editToDO").and.returnValue(
        of({ description: "editToDO" })
      );
      const fetchDataSpy = spyOn(component, "fetchData");

      component.handleUpdate(task);
      expect(editToDOSpy).toHaveBeenCalled();
      expect(fetchDataSpy).toHaveBeenCalled();
    });

    it("editToDO() SHOULD ONLY BE CALLED ONCE", () => {
      const editToDOSpy = spyOn(service, "editToDO").and.returnValue(
        of({ description: "editToDO" })
      );
      component.handleUpdate(task);
      expect(editToDOSpy).toHaveBeenCalledTimes(1);
    });

    it("editToDO() METHOD FAILED",() => {
      const errResponse = 'something went wrong'
      const editToDOSpy = spyOn(service, "editToDO").and.returnValue(throwError(errResponse));
      const errorMsgSpy = spyOn(message,'errorMessage').withArgs(errResponse).and.returnValue(void 0);

      component.handleUpdate(task)
      expect(editToDOSpy).toHaveBeenCalled()
      expect(errorMsgSpy).toHaveBeenCalledWith(errResponse);
    }) 
  });

  describe("CHECK TODO METHOD", () => {
    let task: TodoList = {
      id: "-sdjberjbvgsjdgwr",
      description: "Task#Test",
      completed: false,
      createdOn: new Date(),
    };

    it("completedTask() SHOULD CALLED checkToDO()", () => {
      const completedToDOSpy = spyOn(service, "checkToDO").and.returnValue(
        of({ completed: true })
      );
      component.completedTask(task);
      expect(completedToDOSpy).toHaveBeenCalled();
    });

    it("checkToDo() SUBSCRIBE METHOD", () => {
      const completedToDOSpy = spyOn(service, "checkToDO").and.returnValue(
        of({ completed: true })
      );
      const subSpy = spyOn(service.checkToDO(task), "subscribe");
      component.completedTask(task);
      expect(completedToDOSpy).toHaveBeenCalledBefore(subSpy);
      expect(subSpy).toHaveBeenCalled();
    });
    it("TESTING EXECUTION WITHIN SUBSCRIBE METHOD", () => {
      const completedToDOSpy = spyOn(service, "checkToDO").and.returnValue(
        of({ completed: true })
      );
      const fetchDataSpy = spyOn(component, "fetchData");
      const msgSuccessSpy = spyOn(message,'successMessage');
      component.completedTask(task);
      expect(completedToDOSpy).toHaveBeenCalled();
      expect(msgSuccessSpy).toHaveBeenCalled();
      expect(fetchDataSpy).toHaveBeenCalled();
    });

    it("checkToDO() SHOULD ONLY BE CALLED ONCE", () => {
      const completedToDOSpy = spyOn(service, "checkToDO").and.returnValue(
        of({ completed: true })
      );
      component.completedTask(task);
      expect(completedToDOSpy).toHaveBeenCalledTimes(1);
    });

    it("checkToDO() METHOD FAILED",() => {
      const errResponse = 'something went wrong'
      const checkToDOSpy = spyOn(service, "checkToDO").and.returnValue(throwError(errResponse));
      const errorMsgSpy = spyOn(message,'errorMessage').withArgs(errResponse).and.returnValue(void 0);

      component.completedTask(task)
      expect(checkToDOSpy).toHaveBeenCalled()
      expect(errorMsgSpy).toHaveBeenCalledWith(errResponse);
    }) 
  });

  describe("MODAL OPERATIONS",() => {
    it("handleCanel() METHOD SHOULD SET VISIBILITY AS FALSE",() => {
      component.handleCancel(false);
      expect(component.isVisible).toBe(false);
    });

    it("showModal() METHOD SHOULD SET VISIBLITY AS TRUE AND CURRENT-TASK",() =>{
      let task: TodoList = {
        id:"-adjbsjv",
        description:"test",
        completed:false,
        createdOn: new Date()
      }

      component.showModal(task);
      expect(component.isVisible).toBeTruthy();
      expect(component.currentSelectedTask).toEqual(task);
    })
  })

});
