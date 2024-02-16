import { AfterContentInit, AfterRenderRef, AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, afterNextRender, afterRender} from '@angular/core';
import { Chat, ChatService, Message } from 'src/app/services/chat.service';
import { WsServiceService } from 'src/app/services/ws-service.service';
import { MessagesComponent } from '../messages.component';
import { Observable } from 'rxjs';
import { getLocaleCurrencySymbol } from '@angular/common';
import { Container } from 'src/app/services/entity.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  isActive: false
  chatId:number
   @ViewChild ("messages_container", {static: true}) messagesContainerEl: ElementRef
   @ViewChild("corn", {static: false}) cornEl: ElementRef
  @Input() messagesComponent: MessagesComponent

  constructor(private wsService: WsServiceService, public chatService: ChatService)
  {


  }



  ngOnInit(): void {



   this.chatService.setChatComponent(this)

    }











}
