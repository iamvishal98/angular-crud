import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ModalComponent } from "./modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChanges } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NzFormDirective } from "ng-zorro-antd/form";
import { first } from "rxjs/operators";
import { TodoList } from "../Interface";

describe("ModalComponent", () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ModalComponent, NzFormDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe("CREATION", () => {
    it("should create component", () => {
      expect(component).toBeTruthy();
    });

    it("form should create", () => {
      let form = fixture.debugElement.query(By.directive(NzFormDirective)); //.nativeElement.querySelector("form");
      expect(form).toBeTruthy();
    });
  });

  describe("VALIDATIONS", () => {
    it("should have valid update-description", () => {
      component.validateupdateForm.setValue({
        Updatedescription: "",
      });
      fixture.detectChanges();
      expect(component.validateupdateForm.valid).toEqual(false);
    });

    it("should be valid if form is valid", () => {
      component.validateupdateForm.setValue({
        Updatedescription: "xyz",
      });
      fixture.detectChanges();
      expect(component.validateupdateForm.valid).toEqual(true);
    });
  });

  describe("INPUT", () => {
    it("should recieve value to show/hide modal", () => {
      let show: boolean = true;
      component.isModalVisible = true;
      fixture.detectChanges();
      expect(component.isModalVisible).toBe(show);
      expect(!component.isModalVisible).toBe(!show);
    });

    it("should receive task", () => {
      expect(component.currentTask).toBeTruthy();
    });
  });
  
  describe("OUTPUT", () => {
    it("should emit modal visiblity", () => {
      component.closeModal.subscribe((visiblity: boolean) => {        
        expect(component.isModalVisible).toEqual(visiblity);
      });
      component.handleCancel();
    });

    it("should emit task to be updated", () => {
      component.currentTask = {
        completed: false,
        createdOn: new Date(),
        description: "taks#1",
        id: "NfUuFlnCKhwzl26lbZO",
      };

      component.validateupdateForm.setValue({
        Updatedescription: "task#2",
      });

      component.updateTask.pipe(first()).subscribe((task: TodoList) => {
        expect(task).toEqual(component.currentTask);
      });

      component.handleUpdate();
    });
  });
});
