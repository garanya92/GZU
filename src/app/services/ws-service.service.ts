import { Container } from 'src/app/services/entity.service';

import { User, UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';
import {  Stomp } from '@stomp/stompjs';
import { Observable } from 'rxjs';
import * as SockJS from 'sockjs-client';

import { Statistic } from '../app.component';
import { NotificatorService } from './notificator.service';
import { MessagesComponent } from '../components/messages/messages.component';
import { ChatService, Message } from './chat.service';




@Injectable({
  providedIn: 'root'
})
export class WsServiceService {


  serverUrl = 'http://91.202.145.108:8080/ws';
  public   ws  = new SockJS(this.serverUrl);
  public client  = Stomp.over(this.ws)
  public isConnected = false;
  private messagesComponent: MessagesComponent
  public statistic: Statistic



  constructor(private userService: UserService,
    private chatService: ChatService,
    private notificator: NotificatorService) {

    this.statistic = {
      onlineUsers: 0,
      authorized: 0,
      allUsers: 0


    }
    userService.setWsService(this)
  }


  setMessagesComponent(messages: MessagesComponent)
  {
     this.messagesComponent = messages;
  }




  public  startConnection(){


   this.ws  = new SockJS(this.serverUrl);
   this.client  = Stomp.over(this.ws)

    let streem = new Observable((observe)=>
  {


    this.client.connect( {},  () =>
    {
       //У випадку вдалого підключення
       this.isConnected = true;

       observe.next(true)







    },()=>
    {
                   //Не вдале підключення
                   this.isConnected = false;;
                   observe.next(false)




    },
    ()=>
    {
            //Не вдале підключення
            this.isConnected = false;
            observe.next(false)


    }
          );

  }, )


    return  streem;



}





public subcribe(topic: string)
{
      let streem = new Observable((observe)=>{

              this.client.subscribe(topic, function(response:any)
              {

                    observe.next(response.body)
              })
      })




           return streem;

     }



     sendMessage(path: string, message: string)
     {

         this.client.send(path, {} , message)

     }


 /**
  *
  * @param timeOut Перепідклюяення до вебсокета
  */



  init()
  {
         this.startConnection().subscribe((status)=>
         {
             if (status == false)
             {  console.log("Не вдале підключення WebSocket . Реконект....")
                this.init()
             }

             if (status)
                 this.registerUser()
            }



         )




        }


 subscribePrivateMessages()
 {
    this.subcribe("/user/topic/private-messages").subscribe((respone:any)=>{
        let    message: Message = JSON.parse(respone)

        console.log(respone)
        this.chatService.receiveMessage(message)




            let user: User = {id: message.sender_id, login: message.sender_login,
            avatar_path: message.sender_avatar_path, email: ""}


          this.notificator.showNotification(user, message.message_body)


      })
 }

/**
 *
 Тут відувається розсилка повідомлень які не були отримані
 бо він не був онлайн
 */
  subscribeUndeliveredMessages()
  {
    this.subcribe("/user/topic/private-undelivered-messages").subscribe((respone:any)=>{
       let container: Container = respone

       console.log(respone)



    })

  }


 registerStatus = false;
 registerUser(){

      this.sendMessage("/app/reg_user", this.userService.getUser().id.toString())

     this.subcribe("/topic/all-messages").subscribe((response:any)=>
     {
          this.statistic = JSON.parse(response)
          if (this.statistic.enteredUser?.id == this.userService.getUser().id)
          {
                 console.log("Юзер  зареєстрований на сокеті!")
                 this.subscribePrivateMessages()
                 this.subscribeUndeliveredMessages()
                 this.registerStatus = true;
           }

             if (this.statistic.enteredUser)
           this.notificator.showNotification(this.statistic.enteredUser, "щойно увійшов")


     })


             setTimeout(()=>
             {

               if (this.registerStatus == false)
               {
                console.log("Невдала реєстрація юзера на сокеті. Переконект...2000мс")
                this.sendMessage("/app/reg_user", this.userService.getUser().id.toString())
               }

              },3000)


    }



    }
