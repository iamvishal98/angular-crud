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
  @Output() completedTask = new EventEmitter<TodoList>();
  @Input() todoData!: TodoList[];
  @Input() loading : boolean = false;
  isVisible = false;

  tooltipTitle(task: TodoList): string {
    return task.completed? "mark as incomplete" : "mark as complete"
  }
  //DELETE TASK
  deleteHandler(task: TodoList) {
    this.deleteData.emit(task);
  }

  checkhandler(data: TodoList) {
   // console.log('checked',data)
    // this.todoData = this.todoData.map((item: any) => {
    //   if(item.id === data.id){
    //     if(data.completed) return {...item, completed:false}
    //     else return {...item, completed:true}
    //   }
    //   else
    //     return item;
    // }
    // )
   // console.log('clicked')
    if(data.completed)
      data={...data,completed:false}
    else 
      data={...data,completed:true}

      this.completedTask.emit(data);
    //  console.log(data)

    //this.apiService.checkToDO(data).subscribe((val) => console.log(val));
  }

  //MODAL OPERATIONS
  modalHandler(task: TodoList) {
    this.openModal.emit(task);
  }
  handleCancel(): void {
    this.isVisible = false;
  }


}
