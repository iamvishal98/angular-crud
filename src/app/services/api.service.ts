import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { TodoList } from "../Interface";
import { catchError, filter, map, pluck, take } from "rxjs/operators";
import { Subject, throwError } from "rxjs";
import { error } from "jquery";

interface firebaseData {
  [key: string]: TodoList;
}

@Injectable({ providedIn: "root" })
export class ApiService {
  constructor(private http: HttpClient) {}
  Error = new Subject<string>();

  fetchData() {
    return this.http.get("../assets/demo-data.json");
  }

  fetchUserData(userid: string) {
    //this.http.get('../assets/demo-data.json').pipe(map((resp: any) => resp.data)).subscribe((response: any) =>  console.log(response))
    // this.http.get('../assets/demo-data.json').subscribe((response: any) =>  console.log(response.data.filter((item : any) => item.id === "N0AZPH3AOPT8YGI1")))
    return this.http
      .get("../assets/demo-data.json")
      .pipe(
        map((resp: any) => {
          console.log(resp);
          return resp.data.filter((item: any) => item.id === userid);
        })
      )
      // .pipe(
      //   filter((item: any) => {
      //     console.log("items", item);
      //     return item.id === userid;
      //   })
      // )
      // .subscribe((response) => {
      //   console.log(response);
      // });
  }

  addToDo(data: TodoList) {
    return this.http.post<TodoList>(
      "https://crud-2aa5a-default-rtdb.firebaseio.com/post.json",
      data
    );
  }

  getToDo() {
    return this.http
      .get<firebaseData>(
        "https://crud-2aa5a-default-rtdb.firebaseio.com/post.json",
        {
          headers: new HttpHeaders({
            "Access-Control-Allow-Origin": "*",
          }),
          params: new HttpParams().set("print", "pretty"),
        }
      )
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
    return this.http.delete<TodoList>(
      `https://crud-2aa5a-default-rtdb.firebaseio.com/post/${id}.json`
    );
  }

  editToDO(data: TodoList) {
    return this.http.patch(
      `https://crud-2aa5a-default-rtdb.firebaseio.com/post/${data.id}.json`,
      { description: data.description }
    );
  }
}
