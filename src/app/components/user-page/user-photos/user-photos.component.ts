import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UploadTrackComponent } from '../../dialogs/upload-track/upload-track.component';
import { Photo, PhotoService } from 'src/app/services/photo.service';
import { User, UserService } from 'src/app/services/user.service';
import { Container } from 'src/app/services/entity.service';
import { PictureSliderDialogComponent } from '../../dialogs/picture-slider-dialog/picture-slider-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { PhotoComponent } from '../../photo/photo.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-user-photos',
  templateUrl: './user-photos.component.html',
  styleUrls: ['./user-photos.component.css'],
  standalone: true,
  imports: [MatIconModule, PhotoComponent, CommonModule, MatButtonModule]
})
export class UserPhotosComponent implements OnInit {

 @Input() user: User
 @Output() onReturnPhoto: EventEmitter<Photo>  = new EventEmitter<Photo>()
 isOwner = false;
 isAddingMode = false;
 @Input() photoMode = "MINI"

 constructor(private dialog: MatDialog,
  public photoService: PhotoService,
  private userService: UserService,
 )
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
                this.photoService.userPhotos = container.entity

           })

  }



openUploadDialog()
{
    this.dialog.open(UploadTrackComponent, {data:{type: "Photo"}}).afterClosed().subscribe
    ((container: Container)=>
     {

       this.photoService.userPhotos.push(container.entity)
     }
    )
}


openPictureSlider(index: number)
{     if (!this.isAddingMode)
    this.dialog.open(PictureSliderDialogComponent,
      {height: "100%",  data:{'photos': this.photoService.userPhotos,
      'index': index
    }})
}

/**
 *
 * @param photo
 * Повертаємо вибране фото в дочірній компонент
 */
returnPhoto(photo:Photo)
{
      this.onReturnPhoto.emit(photo)
}

}
