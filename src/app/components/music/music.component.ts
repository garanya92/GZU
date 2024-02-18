import { UserAudioComponent } from './user-audio/user-audio.component';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';

import { Paginator } from './../../services/entity.service';
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AudioService, Track } from 'src/app/services/audio.service';
import { User, UserService } from 'src/app/services/user.service';
import { Tag, TagService } from 'src/app/services/tag.service';
import { AdaptiveService } from 'src/app/services/adaptive.service';
import { Observable, concat, observeOn } from 'rxjs';
import { AllTracksModule } from './music-modules/all-tracks.module';
import { UserTracksModule } from './music-modules/user-tracks.module';
import { TrackComponent } from '../track/track.component';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { InfinityScrollComponent } from '../other/infinity-scroll/infinity-scroll.component';
import { CommonModule } from '@angular/common';
import { TagsComponent } from '../tags/tags.component';
import { MatButtonModule } from '@angular/material/button';




@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css'],
  standalone: true,
  imports: [TrackComponent, MatTabsModule,
     InfinityScrollComponent, MatProgressSpinnerModule,
     CommonModule, TagsComponent, UserAudioComponent, MatButtonModule]
})
export class MusicComponent implements OnInit, AfterViewInit {





  tags: Tag[]
  isTagsPanelShow = false;

  isTagsTracks = false;
  allTracksPagianator: Paginator



  @ViewChild ( "main", {static: true} ) mainEl: ElementRef
  isHostScrollable: any;

  constructor(public audioService: AudioService,
    public userService: UserService,
    public dialog: MatDialog,
    public tagsService: TagService,
    public adaptiveServise: AdaptiveService,
    private host: ElementRef,
    public allTracksModule: AllTracksModule,
    public userTracksModule: UserTracksModule
    )
    {

    //this.allTracksModule = new AllTracksModule(this.audioService)





  }
  ngAfterViewInit(): void {



  }
  ngOnInit(): void {



    this.tagsService.get("/api/general/get_all_tags").subscribe((response)=>
     {
       this.tags = response;
    })
  }


/**
 * Отримуємо клікнутий тег з тег-компонента
 * @param tag
 */






  /**
   * Отримуємо номер активної вкладки
   * @param position
   */
  activeTab(position: number) {
    if (position == 0) {

    }

    if (position == 1) {
      this.userTracksModule.getTracksByUser(this.userService.getUser().id)
    }

  }


  /**
   *
   * @param user Метод Output компонента
   * need-login-lable
   */
  closeLoginComponent(user: User) {
    if (user != null) {
      this.userTracksModule.getTracksByUser(this.userService.getUser().id)
    }


  }

  scrolling()
  {  this.allTracksModule.moreTracks()
     console.log("autoScrolling")
  }






 getTracks(path: string)
 {    let paginator: Paginator
     let stream = new Observable((observe)=>
     {
               this.audioService.get(path).subscribe((responsse) =>{
                   console.log(responsse)
                  paginator = responsse
                  observe.next(paginator)
               })
     }


     )

      return stream
    }


}
