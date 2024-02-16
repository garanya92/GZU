import { Component, Input, OnInit } from '@angular/core';
import { AdaptiveService } from 'src/app/services/adaptive.service';
import { Container } from 'src/app/services/entity.service';
import { Post, PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

@Input() post: Post

   constructor(public postServise: PostService,
    public adaptiveService:AdaptiveService)
   {

   }

  ngOnInit(): void {

  }


  likePost()
  {
       this.postServise.get("/api/user/like_post/"+ this.post.id).
       subscribe((container:Container)=>{
           if (container.status)
           {
             this.post = container.entity
           }
       })
  }


}
