import { TrackComponent } from '../../../../music/track/track.component';
import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/services/comment.service';
import { AvatarComponent } from "../../../../other/avatar/avatar.component";

@Component({
    selector: 'app-comment',
    standalone: true,
    templateUrl: './comment.component.html',
    styleUrl: './comment.component.css',
    imports: [TrackComponent, AvatarComponent , CommentComponent]
})
export class CommentComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.comment)
  }

  @Input() comment: Comment



}
