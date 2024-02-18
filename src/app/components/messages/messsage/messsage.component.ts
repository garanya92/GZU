import { LoginComponent } from './../../dialogs/login/login.component';
import { UserService } from 'src/app/services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import {  ChatService, Message } from 'src/app/services/chat.service';
import { MatDialog } from '@angular/material/dialog';
import { NeedLoginLableComponent } from '../../need-login-lable/need-login-lable.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-messsage',
  templateUrl: './messsage.component.html',
  styleUrls: ['./messsage.component.css'],
  standalone: true,
  imports: [NeedLoginLableComponent, CommonModule]
})
export class MesssageComponent implements OnInit {

@Input() message: Message
 isSender = false;
 constructor(public chatService: ChatService, public userService: UserService,
  private matDialog: MatDialog)
 {

 }
  ngOnInit(): void {






    if (this.userService.getUser().id == this.message.sender_id)
    {
      this.isSender = true;
    }



  }

}
