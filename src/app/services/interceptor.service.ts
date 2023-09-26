import {  HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class InterceptorService implements HttpInterceptor {
intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifiedRequest = req.clone({headers: req.headers.append("Auth","true")})
    return next.handle(modifiedRequest);
}
}