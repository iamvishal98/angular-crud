import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TodoList } from '../Interface';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent implements OnInit {
  constructor(public listService: ListService) {}
  tasks: TodoList[] = [];

  @Output() openModal = new EventEmitter<TodoList>();

  isVisible = false;

  ngOnInit(): void {
    this.tasks = this.listService.listOfData;
    this.listService.editTask.subscribe((value: TodoList[]) => {
      this.tasks = value;
      console.log('edit todocomp', this.tasks);
    });
  }

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
