import { Injectable } from "@angular/core";
import { TodoList } from "../Interface";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class ListService {
  listOfData: TodoList[] = [
    {
      id: "1",
      description: "task#1",
      createdOn: new Date("2023-09-18"),
      completed: false,
    },
    {
      id: "2",
      description: "task#2",
      createdOn: new Date("2023-09-19"),
      completed: false,
    },
    {
      id: "3",
      description: "task#3",
      createdOn: new Date("2023-09-20"),
      completed: false,
    },
  ];

  editTask = new Subject<TodoList[]>();

  addToDo(task: TodoList) {
    this.listOfData.push(task);
  }

  deleteToDo(task: TodoList) {
    const index = this.listOfData.findIndex((obj) => obj.id === task.id);
    this.listOfData.splice(index, 1);
  }

  editToDo(updatedTask: TodoList) {
    const newList: any = this.listOfData?.map((item) => {
      if (item.id === updatedTask.id) {
        return updatedTask;
      }
      return item;
    });
    this.listOfData = newList;
    this.editTask.next(this.listOfData);
    //console.log('edit service', this.listOfData);
  }
}
