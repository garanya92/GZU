import { AfterContentInit, AfterRenderRef, AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, afterNextRender, afterRender} from '@angular/core';
import { Chat, ChatService, Message } from 'src/app/services/chat.service';
import { WsServiceService } from 'src/app/services/ws-service.service';
import { MessagesComponent } from '../messages.component';
import { Observable } from 'rxjs';
import { CommonModule, getLocaleCurrencySymbol } from '@angular/common';
import { Container } from 'src/app/services/entity.service';
import { MesssageComponent } from '../messsage/messsage.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: true,
  imports: [MesssageComponent, CommonModule, MatProgressSpinnerModule]
})
export class ChatComponent implements OnInit{



  chatId:number
   @ViewChild ("messages_container", {static: true}) messagesContainerEl: ElementRef
   @ViewChild("corn", {static: false}) cornEl: ElementRef
  @Input() messagesComponent: MessagesComponent
  @Output() isReady: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private wsService: WsServiceService, public chatService: ChatService)
  {


  }




  ngOnInit(): void {



   this.chatService.setChatComponent(this)

    }











}
