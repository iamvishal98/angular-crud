import { EventEmitter, Injectable } from '@angular/core';
import { TodoList } from '../Interface';

@Injectable({ providedIn: 'root' })
export class ListService {
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

  listUpdated = new EventEmitter<TodoList>();
  deleteTask = new EventEmitter<TodoList[]>();
  editTask = new EventEmitter<TodoList[]>();
  addToDo(task: TodoList) {
    this.listOfData.push(task);
    // this.listUpdated.emit(task);
    //console.log('clicked added task',this.listOfData);
  }

  deleteToDo(task: TodoList) {
    // const newList = this.listOfData.filter((item) => item.id !== task.id);
    // this.listOfData = newList;
    // this.deleteTask.emit(this.listOfData)

    const index = this.listOfData.findIndex((obj) => obj.id===task.id);
    this.listOfData.splice(index,1)
    console.log('delete service', this.listOfData);
  }

  editToDo(updatedTask: TodoList) {
    const newList: any = this.listOfData?.map((item) => {
      if (item.id === updatedTask.id) {
        return updatedTask;
      }
      return item;
    });
    this.listOfData = newList;
    this.editTask.emit(this.listOfData)
    console.log('edit service', this.listOfData);

  }
}