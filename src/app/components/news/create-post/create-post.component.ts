import { AddingFilesContaiener } from './../../other/add-files/add-files.component';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserAudioComponent } from '../../music/user-audio/user-audio.component';
import { UserTracksModule } from '../../music/music-modules/user-tracks.module';
import { AddFilesComponent } from '../../other/add-files/add-files.component';
import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Track } from 'src/app/services/audio.service';
import { CommonModule } from '@angular/common';
import { TrackComponent } from '../../track/track.component';
import { UserService } from 'src/app/services/user.service';
import { Post, PostService } from 'src/app/services/post.service';
import { Container } from 'src/app/services/entity.service';
import {Overlay} from '@angular/cdk/overlay'


@Component({
  selector: 'app-create-post-diaolog',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {

  postTextStr: string
  scrollStrategy: ScrollStrategy
  panelOpenState: boolean
  fileContainer: AddingFilesContaiener

 constructor(
  private matDialog: MatDialog,
  private userTracksModule: UserTracksModule,
  private readonly sso: ScrollStrategyOptions,
  private userService: UserService,
  private postService: PostService)
 {
    this.scrollStrategy = sso.noop()
 }




/**
 * Відкриває вікно, щоб дадати файли до посту
 */
onOpenUserAudio()
{   this.userTracksModule.getTracksByUser(this.userService.getUser().id)
     this.scrollStrategy.disable()

    this.matDialog.open(AddFilesComponent,
    {
      panelClass: 'trend-dialog'
    }). //Отримуємо вибрані файли з діалогу
    afterClosed().subscribe((fileCotainer: AddingFilesContaiener)=>{

       console.log(fileCotainer)

       this.fileContainer = fileCotainer

    })
}

 onPublish()
 {
    if ( this.postTextStr && this.postTextStr.length > 1 || this.fileContainer.photos?.length > 1 && this.fileContainer.tracks.length >1
         )
    {
      let post: Post = {text_container: this.postTextStr,
        tracks: this.fileContainer.tracks,photos: this.fileContainer.photos, creator: this.userService.getUser() }
         this.postService.post(post, "/api/user/create_post").subscribe((container: Container)=>{
             console.log(container)

                if (container.status)
                {

                  this.postService.allPosts.push(container.entity)
                  this.panelOpenState = false;
                }

         })

     }

   else{
   alert("Нічого публікувати!")
   }

  }
}
