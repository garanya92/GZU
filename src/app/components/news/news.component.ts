import { AdaptiveService } from './../../services/adaptive.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from './create-post/create-post.component';
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';
import { Container } from 'src/app/services/entity.service';





@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

numberOfPage = 0;
sizePage = 10;

 constructor(private matDialog: MatDialog,
  public userService: UserService,
  public postService: PostService,
  public AdaptiveService: AdaptiveService)
 {



}

panelOpenState = false;
  ngOnInit(): void {
    if (this.postService.allPosts == null)
    {
        this.getAllPosts()
    }
  }

 //** Відкриття діалового вікна створення новоно посту */
onCreatePostDialog()
{
   this.matDialog.open(CreatePostComponent).afterClosed().subscribe((post: any)=>{

   })
}

  getAllPosts()
{
   this.postService.get("/api/general/get_all_posts/"+ this.numberOfPage + "/" + this.sizePage).
   subscribe((container: Container)=>{
       this.postService.allPosts = container.entity


      })

}

}
