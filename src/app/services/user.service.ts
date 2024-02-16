import { Injectable } from '@angular/core';
import { Track } from './audio.service';
import { EntityService } from './entity.service';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { WsServiceService } from './ws-service.service';

export interface User {

   id:number,
   login: string,
   password?: string,
   avatar_path: string,
   tracks?: Track[],
   email: string
   online?: boolean,
   token?: string



}


@Injectable({
  providedIn: 'root'
})
export class UserService extends EntityService {


 private  user: User
 private usersList: User[]

 //Гостьвий аккаунт-заглушка (Використовується, якщо користувач не авторизувався)
 private quest: User




 private appComponent: AppComponent
 private wsService: WsServiceService

  constructor(override httpClient: HttpClient, )
  {
     super(httpClient)

           this.quest = {id: 0, login: "Гість" , password: "guest",
           email: "quest@gmail.com", avatar_path: "/files/img/guest.png"}

  }

 setWsService(ws: WsServiceService)
 {
   this.wsService = ws
 }


  setAppComponent(appComponent: AppComponent)
  {
     this.appComponent = appComponent;
  }

   setUser(user:User)
   {


      this.user = user
      this.saveUserToStorage()
       //При логінові юзера переєструємось в ws клієнті
    this.wsService.registerUser()
      this.appComponent.setUserAccount(user)

   }


  saveUserToStorage()
  {

       if (this.user != null)
       localStorage.setItem("user", JSON.stringify(this.user))
  }


  getUserFromLocalStorage()
  {
        let temp = localStorage.getItem("user")|| " "
        try{
          this.user = JSON.parse(temp)
        }
       catch{

             this.user = this.quest;
       }
  }

   getUser()
   {
        if (this.user == null)
        {
           this.getUserFromLocalStorage()
        }



         return this.user
      }

   exitFromAccount()
   {
     localStorage.removeItem("user")
     location.reload()
   }

 isUserExist(){

      if (this.getUser().id != 0)
      {
         return true
      }

   else{
     return false;
   }

 }



  }
