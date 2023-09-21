import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoList } from '../Interface';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent {
  @Input() tasks: TodoList[] = [];
  @Output() selectedTask = new EventEmitter<TodoList>();
  @Output() openModal = new EventEmitter<TodoList>();

  isVisible = false;

  //DELETE TASK
  deleteHandler(task: TodoList) {
    this.selectedTask.emit(task);
  }

  //MODAL OPERATIONS
  modalHandler(task: TodoList) {
    this.openModal.emit(task);
  }
  handleCancel(): void {
    this.isVisible = false;
  }
}