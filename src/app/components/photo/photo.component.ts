import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
export class PhotoComponent implements OnInit, AfterViewInit {

@Input() photo: Photo
@Input() mode: string
@Output() onAddPhoto: EventEmitter<Photo>  = new EventEmitter<Photo>()
@ViewChild("img" , {static:true}) imgRef: ElementRef
isAdded = false;
isPhotoTall = false;


constructor(public photoService: PhotoService)
{
  this.mode = PICTURE_MODE.FULL.toString()
}
  ngAfterViewInit(): void {

   console.log('ширина ' +  this.imgRef.nativeElement.offsetWidth +
   " висота" + this.imgRef.nativeElement.offsetHeight)

          console.log(this.imgRef)
  }


  ngOnInit(): void {


  }

 addPhoto()
 {  console.log("addPhoto: " + this.isAdded)
    this.isAdded == false? this.isAdded = true: this.isAdded = false;
   this.onAddPhoto.emit(this.photo)
 }

}
