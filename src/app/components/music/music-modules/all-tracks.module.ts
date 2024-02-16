import { Observable } from 'rxjs';
import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Container, Paginator } from 'src/app/services/entity.service';
import { AudioService, Track } from 'src/app/services/audio.service';




@Injectable({
  providedIn: 'root'
})
export class AllTracksModule {


 pageSize = 30
 pageNunb = 0;
 tracks: Track[] = []
 isProgress = true;
 container: Container
 isAllTracksFinished = false;





  constructor(private audioService: AudioService)
  {
       this.getTracks(this.pageNunb, this.pageSize).subscribe((container:any)=>
       {
            this.container = container

            this.tracks = []
            this.tracks = this.container.entity
            this.isProgress = false;
       })
  }

  getTracks(pageNum: number, pageSize: number)
  {
       let stream = new Observable((observe)=>
       {

        this.audioService.get(`/api/general/get_all_tracks/${pageNum}/${pageSize}`).subscribe((container: Container)=>
        {

                   observe.next(container)
        })

       })

          return stream;
      }

  moreTracks()
  {    this.pageNunb++;
       this.isProgress = true;
         this.getTracks(this.pageNunb, this.pageSize).subscribe((container:any)=>
         {
               this.tracks =   this.tracks.concat(container.entity)
                this.isAllTracksFinished = container.last;
                this.isProgress = false;

                })

  }

 }
