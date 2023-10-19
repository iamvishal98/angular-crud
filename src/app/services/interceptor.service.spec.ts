import { TestBed} from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { InterceptorService } from "./interceptor.service";
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ApiService } from "./api.service";

describe("MyInterceptor", () => {
  let httpMock: HttpTestingController;
  let apiService: ApiService;
  let client: HttpClient;
  let mockurl="https://crud-2aa5a-default-rtdb.firebaseio.com/vxvggsMsQtVr5s6ISWKY5l6SEaH3/post.json";
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [  {
        provide: HTTP_INTERCEPTORS,
        useClass: InterceptorService,
        multi: true,
      },],
    });

    httpMock = TestBed.inject(HttpTestingController);
    apiService =TestBed.inject(ApiService);
    client = TestBed.inject(HttpClient);
  });

  it('should add headers to request',() =>{
    client.get(mockurl).subscribe((response) => {
      console.log(response);
      expect(req.request.headers.get('Auth')).toBe('true');
    });

    const req = httpMock.expectOne(mockurl);
    req.flush({});
    httpMock.verify();
  });
});
