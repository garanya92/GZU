import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Component, Input, OnInit, inject } from '@angular/core';
import { AdaptiveService } from './services/adaptive.service';
import { LoginComponent } from './components/dialogs/login/login.component';
import { User, UserService } from './services/user.service';
import { WsServiceService } from './services/ws-service.service';
import { NotificatorService } from './services/notificator.service';
import { ChatService } from './services/chat.service';
import { LeftMobileMenuComponent } from './components/left-mobile-menu/left-mobile-menu.component';
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


export interface Statistic  {
      onlineUsers: number,
      allUsers: number,
      authorized: number,
      enteredUser?: User
 }





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent  implements OnInit{

  user: User
  userOption = false;
  isNewUserEntered = false;
  statistic: Statistic = {
    onlineUsers: 0, allUsers: 0, authorized: 0
   }


  isMenuShowed: boolean

   constructor(public adaptiveService:AdaptiveService,
    private matDialoge: MatDialog, public userService: UserService,
     public notificator: NotificatorService,
      public wsService: WsServiceService,
      public chatService: ChatService,
      private router: Router)
   {

   }


   private offcanvasService = inject(NgbOffcanvas);

   open() {
     const offcanvasRef = this.offcanvasService.open(LeftMobileMenuComponent)
     offcanvasRef.componentInstance.name = 'World';
   }


  ngOnInit(): void {
       this.userService.setAppComponent(this)

         if (this.adaptiveService.isMobileMode)
         {
           this.adaptiveService.isMenuShowed = false;
         }
       this.user = this.userService.getUser()


        this.wsService.init()
      }

/**
 *
 * @param user Сетимо юзера, коли він увійншов в аккаунт
 */
  setUserAccount(user:User)
  {
      this.user = user;
  }

  openLoginDialog()
  {
       if (!this.userService.isUserExist())
       {
        this.matDialoge.open(LoginComponent)
       }
       else{
        this.router.navigate(["/user/" + this.user.id])
       }
  }






}
