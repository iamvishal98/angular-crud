import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { TodoList } from './Interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private fb: NonNullableFormBuilder) {}

  @Input() updatedTask!: TodoList;
  isVisible = false;
  index: number = 4; // MOCK UNIQUE ID FOR TODO ITEM

  currentSelectedTask: TodoList = {
    id: 0,
    description: '',
    createdOn: new Date(),
  };
  //MOCK DATA LIST
  listOfData: TodoList[] = [
    {
      id: 1,
      description: 'task#1',
      createdOn: new Date('2023-09-18'),
    },
    {
      id: 2,
      description: 'task#2',
      createdOn: new Date('2023-09-19'),
    },
    {
      id: 3,
      description: 'task#3',
      createdOn: new Date('2023-09-20'),
    },
  ];

  validateForm: FormGroup<{
    description: FormControl<string>;
  }> = this.fb.group({
    description: ['', [Validators.required]],
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      let toDo: TodoList = {
        id: this.index,
        description: `${this.validateForm.value.description}`,
        createdOn: new Date(),
      };
      this.index++;
      this.listOfData = [...this.listOfData, toDo];
      this.validateForm.get('description')?.reset();
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  //TODO OPERATIONS
  addToDO() {
    let toDo: TodoList = {
      id: this.index,
      description: `task#${this.index}`,
      createdOn: new Date(),
    };
    this.index++;
    this.listOfData = [...this.listOfData, toDo];
  }
  deleteToDo(toDo: TodoList) {
    const newList = this.listOfData.filter((item) => item.id !== toDo.id);
    this.listOfData = newList;
  }
  editToDo(updatedTask: TodoList) {
    const newData: any = this.listOfData?.map((item) => {
      if (item.id === updatedTask.id) {
        return updatedTask;
      }
      return item;
    });
    this.listOfData = newData;
  }

  //MODAL OPERATIONS
  handleCancel(val: boolean) {
    this.isVisible = val;
  }
  showModal(task: TodoList) {
    this.isVisible = true;
    this.currentSelectedTask = task;
  }
}
