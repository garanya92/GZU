import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from './entity.service';
import { User } from './user.service';
import { Track } from './audio.service';

export interface Post{

  id?: number,
  title?: string,
  text_container:  string,
  creator?: User,
  tracks? :Track[],
  likes?: number,
  likesUser?: User[]


}



@Injectable({
  providedIn: 'root'
})
export class PostService extends EntityService {

  allPosts: Post[]

  constructor(override httpClient: HttpClient) {
     super(httpClient)

   }




  }
