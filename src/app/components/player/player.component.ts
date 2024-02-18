import { Component, ElementRef, ViewChild } from '@angular/core';
import { TrackComponent } from '../track/track.component';
import { AudioService } from 'src/app/services/audio.service';
import { ViewPlayerPanelModule } from './view-player-panel/view-player-panel.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AdaptiveService } from 'src/app/services/adaptive.service';
import { CutStringPipe } from 'src/app/pipes/cut-string.pipe';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  standalone: true,
  imports: [CutStringPipe, MatSliderModule,
    TrackComponent, CommonModule  ]
})
export class PlayerComponent {

  @ViewChild("audio", { static: true }) audio_el: ElementRef
  @ViewChild("main", { static: true }) bar_el: ElementRef
  @ViewChild ("cat", {static: true}) cat_el: ElementRef



  private url = "http://91.202.145.108:8080/files"
  title = ""
  artist = ""
  index = 0
  all = 0
  timeTrack = "0:00"
  currentTimeTrack = "0:00";
  trackSecounds = 0;
  trackDuration = 0;
  isTrackAdd = false;
  persents = 0;
  isVolumeControl = false;
  currentTrackId: number
  viewPanel: ViewPlayerPanelModule

  public isPlaying = false;
  public currentTrack: TrackComponent
  private tracksComponent: TrackComponent[]
  public trackPath = ""
  private prewTrack: TrackComponent
formatLabel: (value: number) => string|number;
  constructor(private audioService: AudioService,
    public adaptiveServise: AdaptiveService) {


  }



  ngOnInit(): void {


     this.viewPanel = new ViewPlayerPanelModule(this.bar_el)


    this.audioService.setPlayer(this)
    this.tracksComponent = []
    this.events()
    this.bar_el.nativeElement.style.display = "none"

      setInterval(()=>
      {
       this.currentTimeTrack =    this.playerTimer(Math.round(this.audio_el.nativeElement.currentTime))
       this.trackSecounds =  Math.round(this.audio_el.nativeElement.currentTime)
       this.persents  = Math.round(this.trackSecounds*100/this.trackDuration)


      },1000)



   this.showCat()

  }



  isCatShow = false
 showCat()
 {
        this.isCatShow = true;
          this.cat_el.nativeElement.style.left = "-10rem";

         setTimeout(()=>{
          this.cat_el.nativeElement.style.left = "-2.5rem"

        },3500)

        let catStep = false;
     if(this.isCatShow)
     {


              setInterval(()=>
              {
                 if (catStep)
                this.cat_el.nativeElement.style.transform = "rotate(35deg)"

                if(!catStep)
                this.cat_el.nativeElement.style.transform = "rotate(25deg)"


             catStep == false? catStep = true: catStep = false

              },300)
     }


      setTimeout(()=>{
         this.isCatShow = false;
         this.cat_el.nativeElement.style.left = "-10rem"
          setTimeout(()=>{
            this.cat_el.nativeElement.style.display = "none"
         },1000)

      },7000)
 }




  play(trackComponent: TrackComponent) {


    this.viewPanel.showTempPanel()



    //Включаємо новий трек
    if (this.currentTrack != trackComponent) {
      if (this.currentTrack != null) {
        this.currentTrack.stop()
        this.currentTrack.setStatusPlyaing(false)

      }

      this.currentTrack = trackComponent;

      this.title = ""
      this.artist = ""

      this.currentTrack = trackComponent
      this.audio_el.nativeElement.src = this.url + trackComponent.track.path
       console.log(trackComponent.track.path + "playNow")

        this.currentTrack.isLoading = true;

      this.audio_el.nativeElement.addEventListener("canplay", () => {
        this.currentTrackId = this.currentTrack.track.id
        this.currentTrack.isLoading = false;
        this.index = trackComponent.index
        this.index++
        this.all = this.tracksComponent.length
        this.title = trackComponent.track.title
        this.artist = trackComponent.track.artist
        this.audio_el.nativeElement.play()
        this.isPlaying = true;
        this.currentTrack.setStatusPlyaing(true)
        this.bar_el.nativeElement.style.display = "block"




       this.timeTrack = this.playerTimer(Math.round(this.audio_el.nativeElement.duration))
       this.trackDuration =   Math.round(this.audio_el.nativeElement.duration)
      })





    }
    else {  //Ставимо, знімаємо з паузи поточний трек
      if (this.isPlaying == true) {
        this.audio_el.nativeElement.pause()
        this.isPlaying = false
        trackComponent.setStatusPlyaing(false)


      }

      else {
        this.audio_el.nativeElement.play()
        this.isPlaying = true
        trackComponent.setStatusPlyaing(true)


      }
    }


  }

  next() {
    this.viewPanel.showTempPanel()

     this.artist =""
     this.title = ""
    this.currentTrack.stop()
    this.index = this.tracksComponent.indexOf(this.currentTrack)

    this.tracksComponent[++this.index].play()

  }

  prew() {
    this.index = this.tracksComponent.indexOf(this.currentTrack)
    this.play(this.tracksComponent[--this.index])
    this.viewPanel.showTempPanel()
  }


  addTracks(track: TrackComponent) {



    this.tracksComponent.push(track)
  }


  events() {
    this.audio_el.nativeElement.addEventListener("ended", () => {

      this.currentTrack.play_count()
      this.currentTrack.active_icon = this.currentTrack.play_icon
      this.currentTrack.track.count_play++;

      this.viewPanel.showTempPanel()
      this.next()

    }
    )
  }


  cleaeTracksComponents() {
    return this.tracksComponent = []
  }

   /**
    * Метод конвертує секунди в адекватний час
    * по типу 00:00
    * @param secounds
    * @returns
    */
   playerTimer(sec: number)
   {

    let timeStr = "0:00"
   if (sec % 60 < 10)
   {
      timeStr =  (Math.floor(sec / 60) + ':0' + sec % 60)
   }

    else{
     timeStr =  (Math.floor(sec / 60) + ':' + sec % 60)
    }





       return timeStr;
        }





  setTimeTrack(progress: any)
  {



        this.audio_el.nativeElement.currentTime = this.trackDuration/100 * progress
  }


  addTrack()
  {
      this.isTrackAdd = true;
      this.currentTrack.clickAddTrack();

  }


  changeVolume(val:any)
  {
    console.log(  this.audio_el.nativeElement.volume)

     this.audio_el.nativeElement.volume = val
  }




}
