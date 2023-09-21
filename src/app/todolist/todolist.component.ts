import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TodoList } from '../Interface';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodolistComponent implements OnInit {

  constructor(public listService: ListService) {
    // listService.listUpdated.subscribe((value: TodoList) => {
    //   console.log('service event',value);
    //   this.tasks = [...this.tasks,value];
    // })
    // this.tasks = this.listService.listOfData;
  }
  tasks: TodoList[] = [];

  //@Output() selectedTask = new EventEmitter<TodoList>();
  @Output() openModal = new EventEmitter<TodoList>();

  isVisible = false;

  ngOnInit(): void {
    this.tasks = this.listService.listOfData;
    // this.listService.listUpdated.subscribe((value: TodoList) => {
      
    //   this.tasks = [...this.listService.listOfData];
    //   // console.log('service event value',value);
    //   // console.log('service event task',this.tasks);
    // })

  this.listService.editTask.subscribe((value: TodoList[]) => {
    this.tasks = value
    console.log('edit todocomp', this.tasks);
  })
  }

  //DELETE TASK
  deleteHandler(task: TodoList) {
    //this.selectedTask.emit(task);
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
