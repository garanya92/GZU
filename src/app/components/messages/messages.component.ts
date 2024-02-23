import { AddingFilesContaiener } from 'src/app/components/other/add-files/add-files.component';
import { MessageStatusResponse } from './../../services/chat.service';

import { User, UserService } from 'src/app/services/user.service';
import { WsServiceService } from './../../services/ws-service.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { AdaptiveService } from 'src/app/services/adaptive.service';
import { ChatComponent } from './chat/chat.component';
import { Chat, ChatService, Message } from 'src/app/services/chat.service';
import { MessagesViewBlockModule } from './moduls/messages-view-block/messages-view-block.module';
import { Container } from 'src/app/services/entity.service';
import { NeedLoginLableComponent } from '../need-login-lable/need-login-lable.component';
import { CommonModule } from '@angular/common';
import { ChatUsersComponent } from './chat-users/chat-users.component';
import { FormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AddFilesComponent } from '../other/add-files/add-files.component';



@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  standalone: true,
  imports: [NeedLoginLableComponent,
  CommonModule, ChatUsersComponent, ChatUsersComponent,
  FormsModule,
  ChatComponent,
 MatIconModule, MatButtonModule]
})
export class MessagesComponent  implements OnInit{

  messagesUsers:User[]
  userChats: Chat[]
  messageStr: string = ""
  chatId: number
 public  isShowedChatListBlock =  true;
 public isShowedMessagesBlock = true;
  chatComponents: ChatComponent[] = []
 public messagesViewController: MessagesViewBlockModule
  ureadMessages = 0;
  isSender = false;
  @ViewChild ("scroll", {static: false}) messagesContainerEl: ElementRef
  isShowUsersBar =  false;
  filesContainer: AddingFilesContaiener

  constructor(private wsServiceService: WsServiceService, public userService: UserService,
    private matDialog: MatDialog, private route: ActivatedRoute, public chatService: ChatService,
    public  adaptiveService: AdaptiveService)
  {
       //Відповідає за відображення блоків повідомлень/списку чатів
      this.messagesViewController = new MessagesViewBlockModule(adaptiveService)
  }

  messages_cont = document.getElementById("messages_container")
  ngOnInit(): void {


 this.wsServiceService.setMessagesComponent(this)
 this.setChat()
 this.chatService.setMessagesComponent(this)

window.addEventListener('resize', ()=>{
  this.scrollDown()
 })

 //Відправка повідомлення по натисненню Enter
 document.addEventListener("keydown", (event)=>{

  if (event.key == "Enter"  && this.messageStr.length > 0)
  {
     this.sendMessage()
  }

})

  }



 // Відправляємо повідомлення
  sendMessage()
  {

    let  message: Message
    message = {sender_avatar_path: this.userService.getUser().avatar_path,
     read: false, delivered: false, sender_id: this.userService.getUser().id,
     sender_login: this.userService.getUser().login, message_body:this.messageStr,
    chat_id: this.chatService.activeChat.id ||0 }

    if ( this.filesContainer && this.filesContainer.tracks &&  this.filesContainer.tracks.length > 0)
    {    message.tracks = []
         message.tracks = this.filesContainer.tracks
    }


          this.chatService.sendMessage(message)
          this.messageStr = ""
      }






//Опускає вниз до останнього повідомлення

scrollDown()
        {
         let  scrolled = false

            if (this.messagesContainerEl != null && scrolled == false)
            setTimeout(()=>
            { scrolled = true
              this.messagesContainerEl.nativeElement.scrollTop = this.messagesContainerEl.nativeElement.scrollHeight;
            },200)

            else{
              setTimeout(()=>{
                 this.scrollDown()
              },200)
            }



          }



   //Отримуємо чат по ід в параметрах
   //Ну і він буде активний
   setChat()
   {
          //Якщо чати ще не були завантажені,  -  підтягуємо
         if (this.chatService.chatsUser == null)
         {
             this.chatService.getAllUsersChat().subscribe((response: Chat[])=>
               {
                   this.chatService.chatsUser = response
                   this.getChatByIdParam()
                   this.scrollDown()

               }
             )
         }
           else{
            //Якщо чати вже були завантажені , - просто отримуємо
            //Активний чат
            this.getChatByIdParam()
           }




  }

  //Дістаємо чат, який нам потрібен (по ід в параметрах)
  // Отримуємо повідомлення з серверу для цього чату
 getChatByIdParam()
 {
  this.route.params.subscribe((param)=>
  {

     this.chatId = param["id"]
         if (this.chatId != 0)
         this.chatService._getChatById(this.chatId).subscribe((response:any)=>{
          this.chatService.activeChat = response


          this.chatService.getChatMessagesById(0, this.chatService.pageSize, this.chatService.activeChat).subscribe((container: Container)=>{
              this.chatService.activeChat.unread_messages_counter  = 0
             if (!this.chatService.activeChat.messagesList || this.chatService.activeChat.messagesList.length == 0)
              for (let message of container.entity)
              {
                    this.chatService.activeChat.messagesList?.unshift(message)
              }

                     this.scrollDown()

                      //Щоб зразу кидало у блок повідомлень юзера
                    if(this.adaptiveService.isMobileMode && this.chatId != 0)
                    {
                           this.messagesViewController.isShowMessagesBlock = true
                           this.messagesViewController.isShowChatsUserBlock = false
                    }

                     this.chatService.container = container
             })


         })

         this.scrollDown()

  })

 }


 /**
  *
  * @param event Ловимо,чи юзер клікнув чат в барі ,
  * щоб потім прибрати бар з чатами в мобільній версії
  */
   clickUserChat(event: any)
   {

       this.messagesViewController.hideChatUsersBlock()
   }



onLogin(response: any)
{
   this.setChat()
   console.log("get masseges after logining!")
}

  openAddFiles()
  {
     this.matDialog.open(AddFilesComponent).afterClosed().
     subscribe((files:AddingFilesContaiener)=>{

       this.filesContainer = files

     })
  }

}
