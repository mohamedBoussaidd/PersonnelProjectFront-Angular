import { TokenService } from './CoterConnecter/common/token.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from  '@angular/core';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY ='Authorization';
@Injectable()
export  class  LogInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req

        const token = this.tokenService.getToken();
        if(token != null){
            authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY,'Bearer '+token)})
        }
        return next.handle(authReq);
    }
}