import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdaptiveService } from 'src/app/services/adaptive.service';
import { Container } from 'src/app/services/entity.service';
import { Post, PostService } from 'src/app/services/post.service';
import { PictureSliderDialogComponent } from '../../dialogs/picture-slider-dialog/picture-slider-dialog.component';
import { Photo } from 'src/app/services/photo.service';
import { TrackComponent } from '../../music/track/track.component';
import { CommonModule } from '@angular/common';
import { PhotoComponent } from '../../photo/photo.component';
import { CommentsComponent } from './comments/comments.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  standalone: true,
  imports: [TrackComponent, CommonModule, PhotoComponent, CommentsComponent]
})
export class PostComponent implements OnInit {

@Input() post: Post
miniPhoto: Photo[]

   constructor(public postServise: PostService,
    public adaptiveService:AdaptiveService,
    private dialog: MatDialog)
   {

   }

  ngOnInit(): void {
         console.log(this.post)
  }


  likePost()
  {
       this.postServise.get("/api/user/like_post/"+ this.post.id).
       subscribe((container:Container)=>{
           if (container.status)
           {
             this.post = container.entity
           }
       })
  }


 openPhotoSlider(photos: Photo[])
 {
   this.dialog.open(PictureSliderDialogComponent , {data: {"photos": photos}} )
 }


}
