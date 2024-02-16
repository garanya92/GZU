import { UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';
import { User } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class NotificatorService {

 user: User
 message: string;
 isShow = false;
 isActive = false;
 private timeOut = 2500

  constructor(private userService: UserService ) {}


   showNotification(user: User, message: string)
   {
        if (user.id != this.userService.getUser().id )
        this.user = user;
        this.message = message;
        if (this.user != undefined && this.message != null)
        {
          this.isActive = true;
          this.isShow  = true;
          setTimeout(()=>{
               this.isShow = false;




          },this.timeOut)
        }

          setTimeout(()=>
          {
            this.isActive = false;
          }, this.timeOut+1000)

      }

       setTimeOut(time: number)
       {
         this.timeOut = time;
       }

}
