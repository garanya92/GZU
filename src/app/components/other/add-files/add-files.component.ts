import { UploadTrackComponent } from './../../dialogs/upload-track/upload-track.component';

import { Track } from 'src/app/services/audio.service';
import { UserTracksModule } from '../../music/music-modules/user-tracks.module';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { Photo } from 'src/app/services/photo.service';
import { Post } from 'src/app/services/post.service';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { TrackComponent } from '../../music/track/track.component';
import { UserPhotosComponent } from '../../user-page/user-photos/user-photos.component';
import { IconComponent } from '../icon/icon.component';
import { CommonModule } from '@angular/common';

export interface AddingFilesContaiener{
    tracks : Track[],
    photos: Photo[]

}


@Component({
  selector: 'app-add-tracks',
  templateUrl: './add-files.component.html',
  styleUrls: ['./add-files.component.css']
  ,standalone: true,
  imports: [MatTabsModule, TrackComponent,
    UserPhotosComponent,IconComponent, CommonModule]
})
export class AddFilesComponent implements OnInit{

  public fileContainer: AddingFilesContaiener





  public tracks: Track[] = []
  public photos: Photo[] = []
  @Output() onChoosenTracks: EventEmitter<Track[]> = new EventEmitter<Track[]>()

constructor(public userTracksModule: UserTracksModule,
  private dialog: MatDialogRef<AddFilesComponent>,
  private dialog2: MatDialog,
  public userService:UserService)
{

}
  ngOnInit(): void {




    if (this.userTracksModule.userTracks == null)
    {
        this.userTracksModule.getTracksByUser(this.userService.getUser().id)
    }
    }
    /**
     *
     * Формування списку доданих треків
     * до посту
     * @param track
     */
      addTrackToList(track: Track)
      {
        const index = this.tracks.findIndex(n => n.id === track.id);
        if (index !== -1) {

          this.tracks.splice(index, 1);
        }
        else{
           this.tracks.push(track)
        }


      }

    /**
     * Формування списку доданих
     * фото в пост
     * @param photo
     */
    addPhotoToList(photo: Photo)
    {
      const index = this.photos.findIndex(n => n.id === photo.id);
      if (index !== -1) {
        this.photos.splice(index, 1);
      }
      else{
         this.photos.push(photo)
      }
    }



       /**
        * Повертає обрані
        * файли в @Output
        */
      returnTracks()
      {
         this.fileContainer = {photos: this.photos, tracks: this.tracks}
         this.dialog.close(this.fileContainer)
      }


     uploadVideo()
     {
       this.dialog2.open(UploadTrackComponent, {
        data: {type: "Video"}
       }).afterClosed().
       subscribe((response)=>{
         console.log(response)
       })
     }


    }





