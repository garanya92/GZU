import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { UploadTrackComponent } from '../../dialogs/upload-track/upload-track.component';
import { Container } from 'src/app/services/entity.service';
import { VideoService } from 'src/app/services/video.service';
import { User } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-videos',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './user-videos.component.html',
  styleUrl: './user-videos.component.css'
})
export class UserVideosComponent implements OnInit {

  @Input() user: User

  constructor(private dialog: MatDialog,
    public videoService: VideoService)
  {

  }
  ngOnInit(): void {
   this.getUserVideo()
  }


uploadVideo()
{
      this.dialog.open(UploadTrackComponent, {data:{'type': 'Video'}}).afterClosed().subscribe((container: Container)=>{

       console.log(container)

      })

}

  getUserVideo()
  {

      this.videoService.get("/api/general/get_all_videos_by_user_id/"+ this.user.id).
      subscribe((container:Container)=>{
          console.log(container)
           this.videoService.userVideos = container.entity
      })
  }

}
