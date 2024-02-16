import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadTrackComponent } from '../../dialogs/upload-track/upload-track.component';
import { Photo, PhotoService } from 'src/app/services/photo.service';
import { User, UserService } from 'src/app/services/user.service';
import { Container } from 'src/app/services/entity.service';
import { PictureSliderDialogComponent } from '../../dialogs/picture-slider-dialog/picture-slider-dialog.component';


@Component({
  selector: 'app-user-photos',
  templateUrl: './user-photos.component.html',
  styleUrls: ['./user-photos.component.css']
})
export class UserPhotosComponent implements OnInit {

 @Input() user: User
 isOwner = false;

 constructor(private dialog: MatDialog,
  public photoService: PhotoService,
  private userService: UserService)
{

}
  ngOnInit(): void {
        this.getUserPhotos()
        if (this.user && this.user.id == this.userService.getUser().id)
        {
          this.isOwner = true
        }

  }

  getUserPhotos()
  {


           this.photoService.get("/api/general/get_photos_by_user_id/"+ this.user.id).subscribe
           ((container: Container)=>{
                console.log(container)
                this.photoService.userPhotos = container.entity

           })

  }



openUploadDialog()
{
    this.dialog.open(UploadTrackComponent, {data:{type: "Photo"}}).afterClosed().subscribe
    ((photo: Photo)=>
     {
       console.log(photo)
       this.photoService.userPhotos.push(photo)
     }
    )
}


openPictureSlider()
{
    this.dialog.open(PictureSliderDialogComponent,
      {  data:{'photos': this.photoService.userPhotos}})
}

}
