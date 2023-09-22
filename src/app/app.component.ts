import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { TodoList } from './Interface';
import { ListService } from './services/list.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private fb: NonNullableFormBuilder,
    private listService: ListService
  ) {}

  isVisible = false;
  private editTaskSubs!: Subscription;
  index: number = 4; // MOCK UNIQUE ID FOR TODO ITEM
  listOfData: TodoList[] = [];

  currentSelectedTask: TodoList = {
    id: 0,
    description: '',
    createdOn: new Date(),
  };

  ngOnInit(): void {
    this.listOfData = this.listService.listOfData;
    this.editTaskSubs = this.listService.editTask.subscribe(
      (value: TodoList[]) => {
        this.listOfData = value;
      }
    );
  }
  ngOnDestroy(): void {
    this.editTaskSubs.unsubscribe();
  }

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
