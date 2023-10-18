import { TestBed } from "@angular/core/testing";
import { ApiService } from "./api.service";
import { ICurrentUser, IFirebaseData, TodoList } from "../Interface";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { HttpRequest } from "@angular/common/http";


describe("API-SERVICES", () => {
  let service: ApiService;
  let testingController: HttpTestingController;
  let reponse: IFirebaseData;
  let user: ICurrentUser;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    testingController = TestBed.inject(HttpTestingController);
    reponse = {
      "-NfUuFlnCKhwzl26lbZO": {
        completed: false,
        createdOn: new Date(),
        description: "taks#2rege",
        id: "this.index",
      },
      "-NfVRfS27prWO8MzAXaI": {
        completed: false,
        createdOn: new Date(),
        description: "thnm",
        id: "this.index",
      },
    };
    const user = {
      displayName: "Test ",
      email: "test@email.com",
      uid: "vxvggsMsQtVr5s6ISWKY5l6S",
    };
    localStorage.setItem("user", JSON.stringify(user));
  });
  afterEach(() => {
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return null if user key is not present in  localStorage", () => {
    const localStorageMock = spyOn(
      window.localStorage,
      "getItem"
    ).and.returnValue(null);
    const result = service.currentUser;
    expect(result).toBeNull();
  });

  it("should return user if user key is  present in  localStorage", () => {
    const localStorageMock = spyOn(
      window.localStorage,
      "getItem"
    ).and.returnValue(
      JSON.stringify({
        displayName: "Test ",
        email: "test@email.com",
        uid: "vxvggsMsQtVr5s6ISWKY5l6S",
      })
    );
    const result = service.currentUser;
    expect(result).toBeTruthy();
  });

  it("should get All the To-do", () => {
    service.getToDo().subscribe((todo: any) => {
      expect(todo).toBeTruthy();
    });
    const req = testingController.expectOne(
      `${service.Url}/${service.currentUser?.uid}/post.json`
    );
    expect(req.request.method).toEqual("GET");
    req.flush(reponse);
  });

  it('should handle error', () => {
    // const mockErrorResponse = new ErrorEvent('HTTP ERROR', {
    //   error: new Error('Something went wrong'),
    //   message: 'Something went wrong',
    // });

    let errorStr = 'Something went wrong'
    service.getToDo().subscribe((data) => {
      //fail('Expected an error');
      console.log('spec suc',data);
      
    }, error => {
      console.log('spec',error);
      
      expect(error).toBe('Something went wrong');
    });

    const req = testingController.expectOne(`${service.Url}/${service.currentUser?.uid}/post.json`);
    req.flush(errorStr,{ status: 400, statusText: "Bad Request" })
    expect(req.request.method).toBe('GET');
  });

  it("should Add To-do in Todo-List", () => {
    const response = { name: "-NgNVAhbZbqm_Kyr2zuo" }; // {name: 'ssvds'}
    const task: TodoList = {
      id: "this.index",
      createdOn: new Date(),
      description: "testing add task",
      completed: false,
    };
    service.addToDo(task).subscribe((resp: any) => {
      expect(resp.name).toBeTruthy();
    });
    const req = testingController.expectOne({
      method: "POST",
      url: `${service.Url}/${service.currentUser?.uid}/post.json`,
    });
    // const req = testingController.expectOne((request: HttpRequest<any>) => {
    //     return (request.url === `${service.Url}/${service.currentUser?.uid}/post.json`)
    //     && (request.method === 'POST')
    //     && (request.body === task)
    // });
    //expect(req.request.method).toBe("POST")
    req.flush(response);
  });

  it("should delete to-do", () => {
    const id = "12345";
    const task: TodoList = {
      id: "12345",
      createdOn: new Date(),
      description: "testing add task",
      completed: false,
    };

    service.deleteToDo(id).subscribe((resp: any) => {
      expect(resp).toBeNull();
    });

    const req = testingController.expectOne(
      `${service.Url}/${service.currentUser?.uid}/post/${id}.json`
    );
    expect(req.request.method).toBe("DELETE");
    req.flush(null);
  });

  it("should edit to-do", () => {
    const id = "12345";
    const task: TodoList = {
      id: "12345",
      createdOn: new Date(),
      description: "testing add task",
      completed: false,
    };

    service.editToDO(task).subscribe((resp: any) => {
      expect(resp.description).toBeTruthy();
    });
    const req = testingController.expectOne(
      `${service.Url}/${service.currentUser?.uid}/post/${id}.json`
    );
    expect(req.request.method).toBe("PATCH");
    req.flush({ description: "updated task" });
  });

  it("should mark task as complete", () => {
    const task: TodoList = {
      id: "12345",
      createdOn: new Date(),
      description: "testing add task",
      completed: false,
    };

    service.checkToDO(task).subscribe((resp: any) => {
      expect(resp.completed).toBeTruthy();
    });

    const mockreq = testingController.expectOne(
      `${service.Url}/${service.currentUser?.uid}/post/${task.id}.json`
    );
    expect(mockreq.request.method).toBe("PATCH");
    mockreq.flush({ completed: true });
  });

  it("should mark task as incomplete", () => {
    const task: TodoList = {
      id: "12345",
      createdOn: new Date(),
      description: "testing add task",
      completed: true,
    };

    service.checkToDO(task).subscribe((resp: any) => {
      expect(resp.completed).toBeFalsy();
    });

    const mockreq = testingController.expectOne(
      `${service.Url}/${service.currentUser?.uid}/post/${task.id}.json`
    );
    expect(mockreq.request.method).toBe("PATCH");
    mockreq.flush({ completed: false });
  });

  it('should fetch table data', () => {
    const parameters = {};
    const expectedData = [{}];

    service.fetchTableData(parameters).subscribe((data) => {
      expect(data).toEqual(expectedData);
    });

    const req = testingController.expectOne('../assets/demo-data.json');
    expect(req.request.method).toBe('GET');
    req.flush(expectedData);
  });

  it('should fetch user data', () => {
    const userId = '1';
    const testData = [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' },
      { id: '3', name: 'Bob Johnson' }
    ];

    service.fetchUserData(userId).subscribe((data) => {
      expect(data.length).toBe(1);
      expect(data[0].id).toBe(userId);
    });

    const req = testingController.expectOne('../assets/demo-data.json');
    expect(req.request.method).toBe('GET');
    req.flush({ data: testData });
  });
});
