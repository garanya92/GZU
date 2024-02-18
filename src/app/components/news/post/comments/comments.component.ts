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


@Component({
    selector: 'app-comments',
    standalone: true,
    templateUrl: './comments.component.html',
    styleUrl: './comments.component.css',
    imports: [MatInputModule, MatIconModule, MatButtonModule,
        IconComponent, FormsModule, CommonModule, CommentComponent]
})
export class CommentsComponent implements OnInit {

  @Input() post: Post
  textInput: string
  fileContainer: AddingFilesContaiener

  constructor(public commentService: CommentService,
    private userService: UserService,
    private dialog: MatDialog){

  }

  ngOnInit(): void {

  }

   //Створює/оновлює коментар на сервері
   saveComment()
   {
     let comment: Comment
     comment = {author: this.userService.getUser(),
    post: this.post, text: this.textInput}
        if (this.fileContainer.photos.length > 0)
           comment.tracks = this.fileContainer.tracks
        if (this.fileContainer.photos.length > 0)
          comment.photos = this.fileContainer.photos


      this.commentService.post(comment, "/api/user/save_comment").
          subscribe((container:Container)=>{
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
