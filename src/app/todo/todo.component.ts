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

  user = this.apiService.currentUser?.displayName;
  ngOnInit(): void {
    this.fetchData();
  }
  isVisible = false;
  index: number = 4; // MOCK UNIQUE ID FOR TODO ITEM
  isDataLoading = false;
  listOfData: TodoList[] = [];
  currentSelectedTask: TodoList = {
    id: "",
    description: "",
    createdOn: new Date(),
    completed: false,
  };

  validateForm: FormGroup<{
    description: FormControl<string>;
  }> = this.fb.group({
    description: ["", [Validators.required]],
  });

  fetchData() {
    this.isDataLoading = true;
    this.apiService.getToDo().subscribe(
      (response) => {
        this.listOfData = response;
        this.isDataLoading = false;
      //  console.log(this.listOfData);
      },
      (error) => {
        this.messageService.errorMessage(error);
        this.isDataLoading = false;
      }
    );

    
    
  }

  submitForm() {
    if (this.validateForm.valid) {
      let toDo: TodoList = {
        id: "this.index",
        description: `${this.validateForm.value.description}`,
        createdOn: new Date(),
        completed: false,
      };
      this.index++;
      this.apiService.addToDo(toDo).subscribe(
        () => {
          this.fetchData();
          this.messageService.successMessage("task added successfully");
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
      this.messageService.successMessage("Task Deleted");
    });
  }
  completedTask(task: TodoList) {
    this.apiService.checkToDO(task).subscribe((data:any) => {
      console.log(data)
      this.fetchData();
      if (task.completed)
        this.messageService.successMessage("Marked as Complete");
      else this.messageService.successMessage("Marked as Incomplete");
    });
  }

  handleUpdate(task: TodoList) {
    this.apiService.editToDO(task).subscribe(
      () => {
        this.fetchData();
        this.messageService.successMessage("Task Updated");
      },
      (error) => {
        this.messageService.errorMessage("something went wrong");
      }
    );
  }
}
