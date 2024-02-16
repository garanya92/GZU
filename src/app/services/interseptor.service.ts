import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class InterseptorService  implements HttpInterceptor{

  constructor(private userService: UserService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = ""
    try{
      token = this.userService.getUser().token + ""
    }
   catch(e)
   {
     console.log("geustMode: userId = 'null'")
   }


          const auth = req.clone ({
            headers: req.headers.set (

             "Authorization",  token

            )
    })




         return next.handle(auth)



  }
}
