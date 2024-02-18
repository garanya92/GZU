import { MatIconModule } from '@angular/material/icon';
import { IconComponent } from './../other/icon/icon.component';
import {  MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AudioService, Track } from 'src/app/services/audio.service';
import { EditTrackComponent } from '../dialogs/edit-track/edit-track.component';
import { UserService } from 'src/app/services/user.service';
import { Container } from 'src/app/services/entity.service';
import { AdaptiveService } from 'src/app/services/adaptive.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CutStringPipe } from 'src/app/pipes/cut-string.pipe';
import { CommonModule } from '@angular/common';
import {  MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css'],
  standalone: true,
  imports: [
     IconComponent,
     MatIconModule,
    MatProgressBarModule,
     MatProgressSpinnerModule,
     CutStringPipe,
    CommonModule,
MatSliderModule,
MatButtonModule]
})
export class TrackComponent {


  @Input() is_playing: boolean = false;
  @Input () isAddingMode: boolean = false;
  @Input() track: Track
  @Input()  index: number
  @Output() onTrackLike:  EventEmitter<Track> = new EventEmitter
  @Output() onTrackAdd: EventEmitter<Track> = new EventEmitter


  is_liked = false;
  persents: number
  isAdded = false;

  play_icon = "assets/play.png"
  pause_icon = "assets/pause.png"
  active_icon = this.play_icon;
  userTrack = false;
  isSended = false;
  isLoading = false;
  isShowInfo  = false;

  settingIsActive = false;

  enterLabel = false;





  constructor(public  audioService: AudioService,
   private  dialog: MatDialog,
   public userService: UserService,
   public  adaptive: AdaptiveService
   ) {



  }


  ngOnInit(): void {


     this.audioService.player.addTracks(this)


     if (this.track.isPlaying == null)
     {
      this.track.isPlaying = false
     }


  }

//Показує юзерів , які поставили лайки
   showUsersLikes()
  {
              if (!this.track.users)
              this.userService.get("/api/general/get_track_info/"  + this.track.id).subscribe((response: Container)=>{

                    console.log(response)
                     this.track.users = response.entity.users

              })

                  this.isShowInfo = true;
  }






   addToUser()
   {
           this.audioService.post(this.track, "/api/user/add_track_to_user").subscribe((response: Container)=>
           {

                   console.log(response)
                       if (response.status == true)
                       {
                         this.isSended = true;
                       }
                })
   }

   play_count()
   {
      console.log("player-counter")
       this.audioService.get(`/api/general/play_counter/${this.track.id}`).subscribe((response)=>
       {
           this.track = response;
           console.log(response)
       })
   }


   play()
   {
        this.audioService.player.play(this)

        this.is_playing == false? this.is_playing = true: this.is_playing = false
        this.track.isPlaying  == false? this.track.isPlaying = true: this.track.isPlaying = false;
   }

   stop()
   {
       this.is_playing = false;
       this.track.isPlaying = false
   }


    like()
    {


        this.audioService.post(this.track, "/api/user/like_track").subscribe((reponse: Container)=>
        {
               if (reponse.errorMessage)
               {
                 console.log("Потрбна авторизація!")

               }
                else{

                  this.track = reponse.entity

                }

              })

    }

   setStatusPlyaing(status: boolean)
  {

                    }

   sendTrack()
   {

   }

   clickAddTrack()
   {  this.isAdded == false? this.isAdded = true: this.isAdded = false;
      this.onTrackAdd.emit(this.track)
   }


     edit()
     {           console.log(this.track)
             this.dialog.open(EditTrackComponent, {
              data: {"trackInput": this.track}
             })
     }

}
