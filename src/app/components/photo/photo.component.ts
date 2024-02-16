import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo, PhotoService } from 'src/app/services/photo.service';


export enum PICTURE_MODE {
   "FULL",
    "MINI",
    "ADDING"
}

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.css'
})
export class PhotoComponent implements OnInit {

@Input() photo: Photo
@Input() mode: string
@Output() onAddPhoto: EventEmitter<Photo>  = new EventEmitter<Photo>()
isAdded = false;



constructor(public photoService: PhotoService)
{
  this.mode = PICTURE_MODE.FULL.toString()
}
  ngOnInit(): void {

  }

 addPhoto()
 {  console.log("addPhoto: " + this.isAdded)
    this.isAdded == false? this.isAdded = true: this.isAdded = false;
   this.onAddPhoto.emit(this.photo)
 }

}
