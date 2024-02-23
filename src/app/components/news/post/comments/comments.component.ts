import { Component, Input, OnInit } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { IconComponent } from "../../../other/icon/icon.component";
import {  Comment, CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';
import { Post } from 'src/app/services/post.service';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddFilesComponent, AddingFilesContaiener } from 'src/app/components/other/add-files/add-files.component';
import { CommentComponent } from "./comment/comment.component";
import { CommonModule } from '@angular/common';
import { Container } from 'src/app/services/entity.service';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
    selector: 'app-comments',
    standalone: true,
    templateUrl: './comments.component.html',
    styleUrl: './comments.component.css',
    imports: [MatInputModule, MatIconModule, MatButtonModule,
        IconComponent, FormsModule, CommonModule,
        CommentComponent, MatExpansionModule]
})
export class CommentsComponent implements OnInit {

  @Input() post: Post
  textInput: string
  fileContainer: AddingFilesContaiener
  panelOpenState = false
  shortListComment: Comment[]
  isShowFullComments = false;

  constructor(public commentService: CommentService,
    private userService: UserService,
    private dialog: MatDialog){

  }

  ngOnInit(): void {

     this.shortListComment = []
      if(this.post.comments &&  this.post.comments[0])
     this.shortListComment.push(this.post.comments[0])

     if(this.post.comments &&  this.post.comments[1])
     this.shortListComment.push(this.post.comments[1])

  }

   //Створює/оновлює коментар на сервері
   saveComment()
   {
     let comment: Comment
     comment = {author: this.userService.getUser(),
    post: this.post, text: this.textInput }




   console.log(comment)

      this.commentService.post(comment, "/api/user/save_comment").
          subscribe((container:Container)=>{
              console.log(container.entity)
            if (container.status)
                {
                    this.textInput = ''
                    this.post.comments?.push(container.entity)
                }


              })

   }

     openAddFiles(){
        this.dialog.open(AddFilesComponent).afterClosed().subscribe
        ((filesContainer: AddingFilesContaiener)=>{
             this.fileContainer = filesContainer
        })
     }
}
