import { TrackComponent } from './../../../../track/track.component';
import { Component, Input } from '@angular/core';
import { Comment } from 'src/app/services/comment.service';
import { AvatarComponent } from "../../../../other/avatar/avatar.component";

@Component({
    selector: 'app-comment',
    standalone: true,
    templateUrl: './comment.component.html',
    styleUrl: './comment.component.css',
    imports: [TrackComponent, AvatarComponent , CommentComponent]
})
export class CommentComponent {

  @Input() comment: Comment

}
