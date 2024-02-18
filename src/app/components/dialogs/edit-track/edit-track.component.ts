import { TagsComponent } from './../../tags/tags.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit , Inject, NgModuleRef, NgModule} from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgModel, NgModelGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AdaptiveService } from 'src/app/services/adaptive.service';
import { AudioService, Track } from 'src/app/services/audio.service';
import { Tag, TagService } from 'src/app/services/tag.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-track',
  templateUrl: './edit-track.component.html',
  styleUrls: ['./edit-track.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule,
    MatFormFieldModule, FormsModule,
     TagsComponent, MatIconModule]
})
export class EditTrackComponent implements OnInit {


   disabledInputs = true;
   tags: Tag[]
   test= "test"

   /**Вже активні теги в трекові (Стрінговий масиив) */
   trackTags: string[]


   strNewTag = ''


  constructor(@Inject(MAT_DIALOG_DATA) public data: {"trackInput": Track},
  public userServie: UserService, private tagService: TagService,
  private audioService: AudioService, public adaptibeService: AdaptiveService,
  public dialogRef: MatDialogRef<EditTrackComponent>)
  {
    this.init()
  }
  ngOnInit(): void {




  }


  init()
  {
      console.log(this.data.trackInput)

     //Розбиваємо теги зі стрінгової строки в  массив
    if (this.data.trackInput.tags != null &&  this.data.trackInput.tags.length > 0)
    {
        this.trackTags = this.data.trackInput.tags.split(" ")
    }


    this.tagService.get("/api/general/get_all_tags").subscribe((response)=>
    {
      this.tags = response
      for (let tag of this.tags)
      {
               if(this.trackTags &&   this.trackTags.indexOf(tag.title) != -1)
               {
                   tag.isSelected   = true;
               }
      }

    })

    if (this.userServie.getUser().id == this.data.trackInput.author_id)
    {
        this.disabledInputs = false
    }
     else{
        this.disabledInputs = true;
     }

  }

     updateTrack()
     {       console.log(this.getStrTags())
             this.data.trackInput.tags = this.getStrTags()
             this.audioService.post(this.data.trackInput , "/api/user/update_track").subscribe((response)=>
             {

                   this.dialogRef.close(response)
             })
     }

      /**
       * Перетворюємо вибрані теги в строку
       */
     getStrTags()
     {
        let  result = ""
        for (let t of this.tags)
        {
              if (t.isSelected == true)
              {
                   result = result + t.title + " "
              }
        }
            return result

     }


  deleteTrack()
  {
       this.audioService.get(`/delete_track/${this.data.trackInput.id}`).subscribe((response)=>{
        this.audioService.deleteTrack(this.data.trackInput)
      this.dialogRef.close(this.data.trackInput)


       })
  }


newTag()
{



    let tag: Tag = {title: this.strNewTag, user_id: this.userServie.getUser().id||0,
      user_login: this.userServie.getUser().login}
       if (this.strNewTag.length > 0)
      this.tagService.post(tag, "/create_tag").subscribe((reponse)=>
     {
               this.tagService.tags.push(reponse)
               this.tags.push(reponse)
     })
}


  onArtist(text:any){
      this.data.trackInput.artist = text.target.value
  }

  onTitle(text: string){
      this.data.trackInput.title = text;
  }
}
