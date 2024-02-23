import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from './entity.service';
import { User } from './user.service';

export interface Video{
    id: number,
    title?: string,
    path: string
    creator: User
}


@Injectable({
  providedIn: 'root'
})
export class VideoService extends EntityService{

   userVideos: Video[]


  constructor(override httpClient: HttpClient) {
    super(httpClient)
  }
}
