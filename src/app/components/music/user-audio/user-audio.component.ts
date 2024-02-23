import { TrackComponent } from '../track/track.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User, UserService } from 'src/app/services/user.service';
import { UploadTrackComponent } from '../../dialogs/upload-track/upload-track.component';
import { Track } from 'src/app/services/audio.service';
import { UserTracksModule } from '../music-modules/user-tracks.module';
import { AllTracksModule } from '../music-modules/all-tracks.module';
import { CommonModule } from '@angular/common';
import { NeedLoginLableComponent } from '../../need-login-lable/need-login-lable.component';
@Component({
  selector: 'app-user-audio',
  templateUrl: './user-audio.component.html',
  styleUrls: ['./user-audio.component.css'],
  standalone: true,
  imports: [TrackComponent, NeedLoginLableComponent,CommonModule]
})
export class UserAudioComponent {



  constructor(public userService: UserService,
    private dialog: MatDialog,
    public userTracksModule: UserTracksModule,
    public allTracksModule: AllTracksModule)
  {

  }
    /**
   * Відкриваємо діалогове вікно  (додавання треку)
   * Підписуємось, отримуємо список завантажених треків
   *
   */
    openUploadDialog() {
      this.dialog.open(UploadTrackComponent,
        {data: {type: "Track"}}).afterClosed().subscribe((track) => {
           this.userTracksModule.userTracks.unshift(track)
            this.allTracksModule.tracks.unshift(track)

      })


    }


    closeLoginComponent(user: User) {
      if (user != null) {
        this.userTracksModule.getTracksByUser(this.userService.getUser().id)
      }
    }

}
