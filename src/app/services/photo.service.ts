import { Injectable } from '@angular/core';
import { EntityService } from './entity.service';
import { HttpClient } from '@angular/common/http';
import { User } from './user.service';

export interface Photo{
  id?: number,
  title?: string,
  path:string,
  author: string,
   user: User,
   likes: number

}


@Injectable({
  providedIn: 'root'
})
export class PhotoService extends EntityService {

 userPhotos: Photo[]

  constructor(override httpClient: HttpClient) {
    super(httpClient)
   }




}
