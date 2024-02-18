import { UserService } from 'src/app/services/user.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Chat, ChatService } from 'src/app/services/chat.service';
import { AdaptiveService } from 'src/app/services/adaptive.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule,
     RouterModule, MatButtonModule]
})
export class ChatUsersComponent {

@Input() chats: Chat[]
@Input() isShowusersBar: boolean
@Output() onClick:EventEmitter<boolean> = new EventEmitter()


constructor(public userService: UserService,
  public adaptiveService: AdaptiveService,
  public chatService: ChatService)
{

}

click()
{
   this.onClick.emit(true)
}

}
