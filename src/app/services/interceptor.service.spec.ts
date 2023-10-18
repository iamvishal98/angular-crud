import { TestBed, fakeAsync, flush, tick } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { HttpRequest, HttpHandler, HttpResponse } from "@angular/common/http";
import { InterceptorService } from "./interceptor.service";
import { of } from "rxjs";
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ApiService } from "./api.service";

describe("MyInterceptor", () => {
  let interceptor: InterceptorService;
  let httpMock: HttpTestingController;
  let apiService: ApiService
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InterceptorService ,  {
        provide: HTTP_INTERCEPTORS,
        useClass: InterceptorService,
        multi: true,
      },],
    });

    interceptor = TestBed.inject(InterceptorService);
    httpMock = TestBed.inject(HttpTestingController);
    apiService =TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add the "Auth" header to the request', fakeAsync(() => {
    // const request = new HttpRequest<any>("GET", "https://crud-2aa5a-default-rtdb.firebaseio.com/vxvggsMsQtVr5s6ISWKY5l6S/post.json");
    // const next: HttpHandler = {
    //     handle: (req: HttpRequest<any>) => {
    //         return of(new HttpResponse());
    //     },
    // };
    // tick()

    // interceptor.intercept(request, next);

    // const modifiedRequest = httpMock.expectOne("https://crud-2aa5a-default-rtdb.firebaseio.com/vxvggsMsQtVr5s6ISWKY5l6S/post.json");
    // // expect(modifiedRequest.request.headers.has("Auth")).toBeTrue();
    // // expect(modifiedRequest.request.headers.get("Auth")).toBe("true");

    // // modifiedRequest.flush({});

    apiService.getToDo().subscribe((res)=>{
        expect(res).toBeTruthy()
    })
      const modifiedRequest = httpMock.expectOne("https://crud-2aa5a-default-rtdb.firebaseio.com/vxvggsMsQtVr5s6ISWKY5l6S/post.json");
      expect(modifiedRequest.request.headers.get("Auth")).toBe("true");
      httpMock.verify();
      flush();
    }));

  //   it('should add "Auth" header to the request', () => {
  //     const request = new HttpRequest('GET', '/api/data');
  //     const next: HttpHandler = {
  //       handle: (req: HttpRequest<any>) => {
  //         return of(new HttpResponse());
  //       }
  //     };

  //     interceptor.intercept(request, next);

  //     const httpRequest = httpMock.expectOne('https://crud-2aa5a-default-rtdb.firebaseio.com/-fhbsdvbhsdvbs/posts.json');
  //     expect(httpRequest.request.headers.get('Auth')).toBe('true');

  //     httpRequest.flush({});
  //   });
  //   it('should return the modified request', () => {
  //     const request = new HttpRequest('GET', '/api/data');
  //     const next: HttpHandler = {   handle: (req: HttpRequest<any>) => {
  //         return of(new HttpResponse());
  //       } };

  //     const modifiedRequest = interceptor.intercept(request, next);
  //     console.log(modifiedRequest);

  //     //expect(modifiedRequest.headers.get('Auth')).toBe('true');
  //   });
});
