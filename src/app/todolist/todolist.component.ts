import { Component, EventEmitter, Output, Input } from '@angular/core';
import { TodoList } from '../Interface';
import { ListService } from '../services/list.service';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent {
  constructor(private listService: ListService) {}

  @Output() openModal = new EventEmitter<TodoList>();
  @Input() todoData!: TodoList[];
  isVisible = false;

  //DELETE TASK
  deleteHandler(task: TodoList) {
    this.listService.deleteToDo(task);
  }

  //MODAL OPERATIONS
  modalHandler(task: TodoList) {
    this.openModal.emit(task);
  }
  handleCancel(): void {
    this.isVisible = false;
  }
}
