import { Component, Input } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-avatar',
  standalone: true,
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent {

  @Input() avatarPath: string
   @Input() size: string
   @Input() login: string



  constructor(public photoService: PhotoService)
{

}

}
