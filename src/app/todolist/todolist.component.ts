import { Component, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import { TodoList } from '../Interface';
import { ListService } from '../services/list.service';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent {
  constructor(private listService: ListService, private apiService: ApiService) {}

  @Output() openModal = new EventEmitter<TodoList>();
  @Output() deleteData = new EventEmitter<TodoList>();
  @Input() todoData!: TodoList[];
  @Input() loading : boolean = false;
  isVisible = false;

  //DELETE TASK
  deleteHandler(task: TodoList) {
    //this.listService.deleteToDo(task);
    //this.apiService.deleteToDo(task.id).subscribe((res) => console.log(res));
    this.deleteData.emit(task);
  }

  //MODAL OPERATIONS
  modalHandler(task: TodoList) {
    this.openModal.emit(task);
  }
  handleCancel(): void {
    this.isVisible = false;
  }


}
