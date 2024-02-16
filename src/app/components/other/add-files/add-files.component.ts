import { UploadTrackComponent } from './../../dialogs/upload-track/upload-track.component';

import { Track } from 'src/app/services/audio.service';
import { UserTracksModule } from '../../music/music-modules/user-tracks.module';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-tracks',
  templateUrl: './add-files.component.html',
  styleUrls: ['./add-files.component.css']
})
export class AddFilesComponent implements OnInit{

  public addedTracks: Track[] = []
  @Output() onChoosenTracks: EventEmitter<Track[]> = new EventEmitter<Track[]>()

constructor(public userTracksModule: UserTracksModule,
  private dialog: MatDialogRef<AddFilesComponent>,
  private dialog2: MatDialog,
  private userService:UserService)
{

}
  ngOnInit(): void {
    if (this.userTracksModule.userTracks == null)
    {
        this.userTracksModule.getTracksByUser(this.userService.getUser().id)
    }
    }
      addTrackToList(track: Track)
      {
        const index = this.addedTracks.findIndex(n => n.id === track.id);
        if (index !== -1) {
          this.addedTracks.splice(index, 1);
        }
        else{
           this.addedTracks.push(track)
        }


      }

       /**
        * Повертає обрані
        * треки в @Output
        */
      returnTracks()
      {
         this.dialog.close(this.addedTracks)
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





