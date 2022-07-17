import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { DataService } from './data.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private DATASERVICE: DataService,
    private router: Router
  ) {}
  intercept(req: any, next: any) {
   
    let url = req.url;

    let acess = this.DATASERVICE.getrole();
   
    let Allowed_acess = acess[1].Allowed_acess;

    if (this.sameurl(Allowed_acess, url)) {
      let tokenizedReq = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.DATASERVICE.getToken(),
        },
      });
      return next.handle(tokenizedReq);
    } else {
      this.router.navigateByUrl('access_denied');
    }
  }
  sameurl(Allowed_acess: any, url: any) {
    var condition: any;
    Allowed_acess?.map((res: any) => {
      if (url.includes(res)) {
        condition = true;
      }
    });
    return condition;
  }
}
