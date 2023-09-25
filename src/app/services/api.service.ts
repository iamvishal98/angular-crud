import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoList } from '../Interface';
import {map} from 'rxjs/operators'

interface firebaseData {
    [key: string] : TodoList
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  fetchData() {
    return this.http.get('../assets/demo-data.json');
  }

  addToDo(data: TodoList) {
     return this.http
      .post<TodoList>('https://crud-2aa5a-default-rtdb.firebaseio.com/post.json', data)
  }

  getToDo() {
    return this.http.get<firebaseData>("https://crud-2aa5a-default-rtdb.firebaseio.com/post.json")
    .pipe(map((response : firebaseData ) => {
        const todoListData  = [];
        for (const key in response) {
            if(response.hasOwnProperty(key)) {
                todoListData.push({...response[key], id: key});
            }
        }
        return todoListData;
    }))
    // .subscribe((res) => console.log(res));
  }

  deleteToDo(id: string) {
    return this.http.delete<TodoList>(`https://crud-2aa5a-default-rtdb.firebaseio.com/post/${id}.json`)
    //.subscribe(res => console.log(res));
}

editToDO(data: TodoList) {
   return this.http.patch(`https://crud-2aa5a-default-rtdb.firebaseio.com/post/${data.id}.json`,{description: data.description});
}
}
