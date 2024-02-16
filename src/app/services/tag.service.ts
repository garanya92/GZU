import { Injectable } from '@angular/core';
import { Container, EntityService, Paginator } from './entity.service';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { AudioService, Track } from './audio.service';


export interface Tag {

   id?: number,
   title: string,
   user_id: number,
   user_login: string
   tracks?: Track[],
   isSelected?: boolean,
   container?: Container
   sizePage?: number
   numbPage?: number
   lastPage?: boolean


}



@Injectable({
  providedIn: 'root'
})
export class TagService extends EntityService {


 tags: Tag[]
 sizePage: number
 isTagsFilterActive: boolean;
 isProgress: boolean;



  constructor(override httpClient: HttpClient, public audioService: AudioService) {
super(httpClient)

   httpClient.get(this.baseUrl + "/api/general/get_all_tags").subscribe((response: any)=>
   {
       this.tags = response
   })

   this.sizePage = 30;
   this.isTagsFilterActive = false;




}

/**
 * Отримуємо вибраний тег
 * @param tag
 */
onSelectedTag(tag: Tag)
{

   if (tag.isSelected)
   {
          if (tag.tracks == null || tag.tracks &&  tag.tracks.length == 0)
          this.getTracksByTag(tag, 0, this.sizePage)
   }
    else{

    }


    let temp = false;
    for (let t of this.tags)
    {
            if (t.isSelected)
            {
              this.audioService.allTracks = []
              temp = true;

            }
    }
   this.isTagsFilterActive = temp;


  console.log(tag)
}


//Отримуємр треки з сервера з тегом та сетимо їх в сам тег
getTracksByTag(tag: Tag, numPage: number, sizePaige: number)
{        this.isProgress = true
        this.httpClient.get(this.baseUrl + `/api/general/get_tracks_by_tag/${tag.title}/${numPage}/${sizePaige}`).subscribe((cont: any)=>
        {
            let conteiner: Container = cont
             tag.container = conteiner
             if (tag.tracks == undefined)
               tag.tracks = []

            tag.tracks =    tag.tracks.concat(conteiner.entity)
            this.isProgress = false;


        })
}

moreTracks(tag: Tag){



    if (tag.container && tag.container?.number != undefined && !tag.container.last)
     this.getTracksByTag(tag, tag.container?.number+1, this.sizePage);

}

//Скинути фільтрацію по тегам
 closeTagsFilers()
  {
       for (let tag of this.tags)
       {
          tag.isSelected = false;


       }
  this.isTagsFilterActive = false;


      }

  }
