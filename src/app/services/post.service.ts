import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from './entity.service';
import { User } from './user.service';
import { Track } from './audio.service';
import { Photo } from './photo.service';
import { Comment } from './comment.service';

export interface Post{

  id?: number,
  title?: string,
  text_container:  string,
  creator?: User,
  tracks? :Track[],
  photos?: Photo[],
  likes?: number,
  likesUser?: User[],
  comments?: Comment[]


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
