import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from "@angular/forms";
import { TodoList } from "../Interface";
import { ApiService } from "../services/api.service";
import { MessageService } from "../services/message.service";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"],
})
export class TodoComponent implements OnInit {
  constructor(
    private fb: NonNullableFormBuilder,
    private apiService: ApiService,
    private messageService: MessageService
  ) {}
ngOnInit(): void {
  this.fetchData();
}
  isVisible = false;
  index: number = 4; // MOCK UNIQUE ID FOR TODO ITEM
  isDataLoading = false;
  listOfData: TodoList[] = [];
  currentSelectedTask: TodoList = {
    id: '',
    description: '',
    createdOn: new Date(),
  };

  validateForm: FormGroup<{
    description: FormControl<string>;
  }> = this.fb.group({
    description: ["", [Validators.required]],
  });

  fetchData() {
    this.isDataLoading = true;
    this.apiService.getToDo().subscribe((response) => {
      this.listOfData = response;
      this.isDataLoading = false;
    },error => {
      this.messageService.errorMessage(error);
      this.isDataLoading=false;
    });
  }



  submitForm() {
    if (this.validateForm.valid) {
      let toDo: TodoList = {
        id: "this.index",
        description: `${this.validateForm.value.description}`,
        createdOn: new Date(),
      };
      this.index++;
      //this.listService.addToDo(toDo);
      //console.log('from app componnent', this.listService.listOfData);
      this.apiService.addToDo(toDo).subscribe(
        () => {
          this.fetchData();
           
        },
        (error) => {
          this.messageService.errorMessage("something went wrong");
        }
      );

      this.validateForm.get("description")?.reset();
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleCancel(val: boolean) {
    this.isVisible = val;
  }
  showModal(task: TodoList) {
    this.isVisible = true;
    this.currentSelectedTask = task;
  }

  deleteData(task: TodoList) {
    this.apiService.deleteToDo(task.id).subscribe(() => {
      this.fetchData();
      this.messageService.successMessage('Task Deleted');
    });
  }

  handleUpdate(task: TodoList) {
    this.apiService.editToDO(task).subscribe(() => {
      this.fetchData();
      this.messageService.successMessage('Task Updated');
    },error => {
      this.messageService.errorMessage('something went wrong');
    });
  }
}
