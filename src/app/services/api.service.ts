import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ICurrentUser, IDataTable, TodoList } from "../Interface";
import { catchError, map } from "rxjs/operators";
import { Observable, Subject, throwError } from "rxjs";

interface firebaseData {
  [key: string]: TodoList;
}

@Injectable({ providedIn: "root" })
export class ApiService {
  constructor(private http: HttpClient) {}
  Error = new Subject<string>();
  get currentUser(): ICurrentUser | null {
    return JSON.parse(localStorage.getItem("user")!) || null;
  }

  Url = "https://crud-2aa5a-default-rtdb.firebaseio.com";

  addToDo(data: TodoList): Observable<{name: string}>{
    return this.http.post<{name: string}>(
      `${this.Url}/${this.currentUser?.uid}/post.json`,
      data
    );
  }

  getToDo() {  
    return this.http
      .get<firebaseData>(`${this.Url}/${this.currentUser?.uid}/post.json`, {
        headers: new HttpHeaders({
          "Access-Control-Allow-Origin": "*",
        }),
      })
      .pipe(
        map((response: firebaseData) => {
          const todoListData = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              todoListData.push({ ...response[key], id: key });
            }
          }
          return todoListData;  
        }),
        catchError((errorResponse) => {
          return throwError("Something went wrong");
        })
      );
  }

  deleteToDo(id: string) {
    return this.http.delete<null>(
      `${this.Url}/${this.currentUser?.uid}/post/${id}.json`
    );
  }

  editToDO(data: TodoList) {
    return this.http.patch(
      `${this.Url}/${this.currentUser?.uid}/post/${data.id}.json`,
      { description: data.description }
    );
  }
  checkToDO(data: TodoList) {
    return this.http.patch(
      `${this.Url}/${this.currentUser?.uid}/post/${data.id}.json`,
      { completed: data.completed }
    );
  }

  //for Datables
  fetchTableData(parameters:any) {
   return   this.http.get("../assets/demo-data.json",parameters).pipe(
      map((data:any) => {
        return data
      }) 
    );
  }

  fetchUserData(userid: string) {
    return this.http.get<IDataTable[]>("../assets/demo-data.json").pipe(
      map((resp: any) => {
        return resp.data.filter((item: any) => item.id === userid);
      })
    );
  }
}
