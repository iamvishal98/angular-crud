import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { TodoList } from './Interface';
import { ListService } from './services/list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private fb: NonNullableFormBuilder,
    private listService: ListService
  ) {}

  @Input() updatedTask!: TodoList;
  isVisible = false;
  index: number = 4; // MOCK UNIQUE ID FOR TODO ITEM

  currentSelectedTask: TodoList = {
    id: 0,
    description: '',
    createdOn: new Date(),
  };

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
      this.listService.addToDo(toDo);
      console.log('from app componnent', this.listService.listOfData);
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

  //MODAL OPERATIONS
  handleCancel(val: boolean) {
    this.isVisible = val;
  }
  showModal(task: TodoList) {
    this.isVisible = true;
    this.currentSelectedTask = task;
  }
}
