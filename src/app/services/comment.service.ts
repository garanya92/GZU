import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from './entity.service';
import { Track } from './audio.service';
import { Photo } from './photo.service';
import { Post } from './post.service';
import { User } from './user.service';


 export interface Comment{
   id?: number,
   author: User,
   text?: string,
   tracks?: Track[] ,
   photos?: Photo[],
   likes? : number,
   post: Post


 }


@Injectable({
  providedIn: 'root'
})
export class CommentService extends EntityService {

  constructor(override httpClient: HttpClient) {
    super(httpClient)
   }
}
