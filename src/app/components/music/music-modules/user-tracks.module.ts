import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { AudioService, Track } from 'src/app/services/audio.service';



@Injectable({
  providedIn: 'root'
})
export class UserTracksModule {

 userTracks: Track[]

     constructor(public userService: UserService,
      public audioService: AudioService)
      {

      }




  //Отримуємо треки користувача
  getTracksByUser(id: number) {

      this.audioService.get("/api/general/get_tracks_by_user/" + id).
        subscribe((response) => {
          this.userTracks = response;
        })



  }

}
