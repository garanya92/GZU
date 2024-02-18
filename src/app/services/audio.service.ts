import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from './entity.service';
import { PlayerComponent } from '../components/player/player.component';
import { User } from './user.service';
import { TrackComponent } from '../components/track/track.component';


export interface Track  {
  id: number,
  title: string,
  artist: string,
  path: string,
  author_id: number,
  author: string,
  count_play: number,
  likes: number,
  description: string,
  users?: User[],
  like: boolean,
  tags :string,
  isPlaying: boolean



}




@Injectable({
  providedIn: 'root'
})
export class AudioService extends EntityService  {


  allTracks: Track[]
  player: PlayerComponent
  currentTrackIdPlaying = 0;


  constructor( override httpClient: HttpClient) {
  super(httpClient);
  }






  setPlayer(player: PlayerComponent)
  {
     this.player = player;
  }


deleteTrack(track: Track)
{



}

}
