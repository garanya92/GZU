import { AdaptiveService } from './../../services/adaptive.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from './create-post/create-post.component';
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';
import { Container } from 'src/app/services/entity.service';
import { PostComponent } from './post/post.component';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from '../dialogs/error-message/error-message.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';






@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  standalone: true,
  imports: [PostComponent,
     CreatePostComponent,
      CommonModule, ErrorMessageComponent,
    MatProgressSpinnerModule]
})
export class NewsComponent implements OnInit {

numberOfPage = 0;
sizePage = 10;
isShowError = false;
isLoading = true;

 constructor(private matDialog: MatDialog,
  public userService: UserService,
  public postService: PostService,
  public adaptiveService: AdaptiveService)
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
   this.isLoading = true;
   this.postService.get("/api/general/get_all_posts/"+ this.numberOfPage + "/" + this.sizePage).
   subscribe((container: Container)=>{
       this.postService.allPosts = container.entity
     this.isShowError = false;
     this.isLoading = false;

      },error => {

    this.isShowError = true;
    this.isLoading = false;
      })

}



}
