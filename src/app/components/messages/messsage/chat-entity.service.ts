import { Injectable } from '@angular/core';
import { Chat } from 'src/app/services/chat.service';

@Injectable({
  providedIn: 'root'
})
export class ChatEntityService {

chat: Chat
chatId: number
isActive = false;


  constructor() {


   this.chatId = this.chat.id||0

  }
}
