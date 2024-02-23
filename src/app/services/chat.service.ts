
import { ChatComponent } from './../components/messages/chat/chat.component';
import { Injectable } from '@angular/core';
import { User, UserService } from './user.service';
import { Container, EntityService } from './entity.service';
import { HttpClient } from '@angular/common/http';
import { MessagesComponent } from '../components/messages/messages.component';
import { Observable, concat } from 'rxjs';
import { Track } from './audio.service';


export interface Chat {
   id?: number,
   users: User[],
   messagesList?: Message[],
   unread_messages_counter?: number,
   page: number,
   lastMessage?: string

}

export interface MessageStatusResponse{
   chatId: number,
   messageId: number
   isReceiverOnline: boolean,
   isDelivered: boolean,
   isRead: boolean,
   message: string

}

export interface Message {
 id?: number,
 sender_avatar_path: string,
 sender_id:number,
 message_body: string,
 read: boolean,
 delivered: boolean,
 sender_login: string,
 time?: string,
 chat_id: number,
 tracks?: Track[]




}


@Injectable({
  providedIn: 'root'
})
export class ChatService extends EntityService {

private  chatComponent: ChatComponent;
private  messagesComponent: MessagesComponent
public chatsUser: Chat[] //Массив чатів юзера
public container: Container //Контейнер  з повідомленнями , який ми отримуємо з беку
public activeChat: Chat
public  pageSize =  10;
public allUnreadMessages= 0;

constructor(override httpClient: HttpClient, private userService: UserService) {
    super(httpClient);
  }



    setMessagesComponent(messges: MessagesComponent)
    {
        this.messagesComponent = messges;
    }
    setChatComponent(chatComp: ChatComponent)
    {
   this.chatComponent = chatComp;
    }



   /**
    * Отримуємо массив повідомлень для чату.
    * @param page
    * @param size
    * @param chat
    */
   public getChatMessagesById( page: number, size :number, chat: Chat)
   {
        return      this.get("/api/user/get_messages_by_chat_id_width_pagination/" +
         page + "/" + size + "/" + chat.id);

   }

    /**
     * Отримуємо масив чатів юзера
     */
   getAllUsersChat()
   {
        return  this.get("/api/user/get_all_chats_by_user");
   }



   /**
    * Отримуємо чат по id зі массиву чаті , які вже є на фронті
    * Якщо не фронті  такого чату не знайдено, -  отримуємо його з
    * бекенду (Для цього і потрібен RXJx)
    * @param id
    * @returns
    */
   _getChatById(id: number)
   {
         let stream = new Observable((observe)=>{
         let  found = false;
              for (let chat of this.chatsUser)
              {
                 if (id == chat.id)
                 {
                         observe.next(chat)
                          found = true
                 }
              }

              if (found == false)
              this.get("/api/user/get_chat_by_id/"+ id).
             subscribe((container: Container)=>{

                    if (container.status)
                    {
                      this.chatsUser.push(container.entity)
                      observe.next(container.entity)
                    }

              })


         })

           return stream
      }


  // Відправляємо повідомлення
  sendMessage(message: Message)
  {
      /**
       * Що нам треба ?
       * Треба відправити повідомлення на сервер. Вказавши, в який саме чат
       * його потрібно відправити
       */





        this.post(message, "/send_message").subscribe((messageSatusResponse:
          MessageStatusResponse)=>
        {

          message.id = messageSatusResponse.messageId
          this.activeChat.messagesList?.push(message)
          this.messagesComponent.scrollDown()
          console.log(messageSatusResponse)



        })


      }



     //Показує попередні повідомлення
      showPrewChatMessages()
      {

                    this.activeChat.page++;
                    this.getChatMessagesById(this.activeChat.page, this.pageSize, this.activeChat).subscribe((container: Container)=>
                    {
                        this.container = container
                        for(let message of container.entity)
                        {
                            this.activeChat.messagesList?.unshift(message)
                        }

                    })



      }

   receiveMessage(massage: Message){

          if (this.activeChat)
          {
          if  (massage.chat_id == this.activeChat.id)
          {
               this.activeChat.messagesList?.push(massage)
               this.activeChat.lastMessage = massage.message_body
               this.messagesComponent.scrollDown()
               this.allUnreadMessages++;
          }
          else{
             this._getChatById(massage.chat_id).subscribe((response:any)=>{

               let chat: Chat = response;
               if (chat.unread_messages_counter == null)
                chat.unread_messages_counter = 0;
               chat.messagesList?.push(massage)
               chat.unread_messages_counter++;
               chat.lastMessage = massage.message_body
               this.allUnreadMessages++;

             })

          }
        }
        else{
             this.allUnreadMessages++;
        }

   }

}
