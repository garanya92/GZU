
import { User } from 'src/app/services/user.service';


import { Component, ContentChild, ElementRef, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { AudioService, Track } from 'src/app/services/audio.service';
import { EditTrackComponent } from '../edit-track/edit-track.component';
import { MatProgressSpinner, MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';




/**
 * Діалогове вікно- загружчик , яке вивантажує файли на сервер
 * 1.На вхід подаємо в параметрах MatDialog Обєкт-боланку ,
 * потім вже повернемо ,  - в нього готовий вивантажений обєкт .
 * 2.Також вказуємо Type стрінгом , - щоб орієнтуватися,  -
 * який саме тип буде вивантажуватися, щоб виконувати, ті чи інші дії
 */
@Component({
  selector: 'app-upload-track',
  templateUrl: './upload-track.component.html',
  styleUrls: ['./upload-track.component.css'],
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule]
})
export class UploadTrackComponent  implements OnInit{



  @ViewChild("input", {static: true}) inputRef: ElementRef
  filesSize: number = 0;
  files: any
  uploadFile: any
  isError: boolean;
  isStop: boolean;
  isUpload: boolean;
  trackUploadPath = "/api/user/upload_track"
  imgUploadPath= "/api/user/upload_photo"
  videoUploadPath = "/api/user/upload_video"
  audioInputTypes = ".mp3"
  videInputTupes = ".mp4 .avi"
  photoInputTypes = ".img, .jpg, .png"
  activeInputFilterTypes = ""

   constructor(
    public dialogRef: MatDialogRef<UploadTrackComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{type: string, uploadFile: any},
    private audioService: AudioService,
   private dialog: MatDialog)
   {

   }
  ngOnInit(): void {

      console.log(this.data.type)

     this.inputRef.nativeElement.addEventListener("change",(event: any) =>
     {
           if (event.target.files != null)
           {
                this.filesSize = event.target.files.length
                this.files = event.target.files
           }

     })

    this.isError = false;
    this.isStop = false;
    this.isUpload = false;


    //Фільтр  в інпуті, що саме завантажувати
    if (this.data.type == "Track")
  {
      this.activeInputFilterTypes = this.audioInputTypes
  }

  if (this.data.type == "Photo")
  {
      this.activeInputFilterTypes = this.photoInputTypes
  }

  }


  uploadBtn()
  {
        if (this.data.type == "Track")
        {
           this.startUpload(this.trackUploadPath)

        }
         if (this.data.type == "Video")
         {
          this.startUpload(this.videoUploadPath)
         }

         if(this.data.type == "Photo")
         {
            this.startUpload(this.imgUploadPath)
         }

  }

      /**
       * Початок завантаження
       */
       startUpload(path: string)
       {

           if (this.inputRef.nativeElement.files.length > 0 && this.isStop == false)
           {
              this.isUpload = true;
              let formData = new FormData()
              formData.append("file", this.inputRef.nativeElement.files[0])


               this.audioService.post( formData, path).subscribe((response)=>
               {
                          console.log(this.data.type)
                           this.uploadFile = response
                         if (this.data.type == "Track")
                         {
                            this.openEditTrack()
                         }

                         else{

                          this.stopUpload()
                         }




               })
              }
               else{
                   this.isError = true
               }

            }

            /**
             *
             * Зупинка завантаження
             */
  stopUpload()
  {
     this.isStop = true;
     this.isUpload = false;
       /**
        * Якщо ми завантажуємо відео,  - просто
        * закриваємо діалогове вікно після завантаження ,
        *  та передаємо обєкт назад
        */
       this.dialogRef.close(this.uploadFile)


  }
       /**
        * У випадку, якщо ми вивантжуємо трек -  відкриваємо
        * вікно редагування треку, -  теги)
        */
     openEditTrack()
     {
      this.dialog.open(EditTrackComponent, {
        data: {"trackInput": this.uploadFile}
       }).afterClosed().subscribe((repponse:Track)=>{
        this.dialogRef.close(repponse)
       })

       this.isStop = true;
       this.isUpload = false;
      }

}
