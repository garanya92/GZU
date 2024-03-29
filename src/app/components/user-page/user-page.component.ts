import { MatDialog } from '@angular/material/dialog';
import { UserTracksModule } from './../music/music-modules/user-tracks.module';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Chat } from 'src/app/services/chat.service';
import { Container } from 'src/app/services/entity.service';
import { User, UserService } from 'src/app/services/user.service';
import { MatTabsModule } from '@angular/material/tabs';
import { UserPhotosComponent } from './user-photos/user-photos.component';
import { UserAudioComponent } from '../music/user-audio/user-audio.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserVideosComponent } from './user-videos/user-videos.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  standalone: true,
  imports: [MatTabsModule, UserPhotosComponent,
     UserAudioComponent, CommonModule, MatButtonModule ,
    UserVideosComponent]
})
export class UserPageComponent implements OnInit {

   userParam: User
   isOwner = false;
   constructor(public userService: UserService,
    private paramRouter: ActivatedRoute,
    public userTracksModule: UserTracksModule,
    private router: Router,
    private dialog: MatDialog)
   {

   }


  ngOnInit(): void {
    this.getUserFromParam()
  }

  //Отримуємо юзера по id в параметрах
  getUserFromParam()
  {
       this.paramRouter.params.subscribe((params: Params)=>{
       this.userService.get("/api/general/get_user_by_id/"+ params["id"]).
       subscribe((container: Container)=>{
            if (container.status)
            {
                this.userParam = container.entity
                console.log(container)
                if (this.userParam.id == this.userService.getUser().id)
                {
                    this.isOwner = true
                }
            }
       })

       })
  }


  /**
   *
   * @param index
   * Активна вкладка.
   * В залежності від відкритої вкладки , -
   * підятуємо медіаресурси
   * (Щоб не волокти все зразу )
   */
activeTab(index: number)
{
 console.log(index)
 if (index == 1)
 {


         this.userTracksModule.getTracksByUser(this.userParam.id)

 }
}

/**
 * Кнопка відправити повідомлення в профілі користувача
 * Отримуємо чат з беку,  -
 * перероходимо в чат по ID
 */
 sendMessage()
 {
       let chat: Chat
       chat = {page: 0, users: [this.userParam, this.userService.getUser()]}
       this.userService.post(chat,"/api/user/init_chat").subscribe
       ((container: Container)=>{

                  this.router.navigate(["/messages/" + container.entity.id])

       })
 }





}
