import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Chat, ChatService } from 'src/app/services/chat.service';
import { Container } from 'src/app/services/entity.service';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

@Input() public  user: User
avatarPath: string

  constructor(public userService: UserService,
    private chatService: ChatService, private router: Router)
  {

  }
  ngOnInit(): void {
    this.avatarPath = this.userService.baseUrl + this.user.avatar_path

  }



  onSendMessage()
  {
      if(this.userService.getUser().id != 0)
      {
          let chat: Chat
          chat = {page: 0,  users: [this.user,  this.userService.getUser()],
         }


                 this.chatService.post( chat, "/api/user/init_chat").
                 subscribe((container: Container)=>
                 {

                       this.router.navigate(["/messages/" + container.entity.id])

                 })
      }
  }

}
