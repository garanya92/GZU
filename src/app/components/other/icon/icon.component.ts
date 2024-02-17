import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css'
})
export class IconComponent implements OnInit {



   /**
  * Вказуємо , який саме значок ми хочемо показати:
  * photo/video/etc...
  */
 @Input() icon: string

 /**
  * Вказуємо , який розмір значка потрібен
  *
  */
 @Input() size = "1rem"


  /**
   * Текст, який буде праворуч від іконки
   */
 @Input() text: string

 photo = "/assets/photo.png"
 video = "/assets/video.png"
 note = "/assets/note.png"
 activeIcon = "/assets/error.png"



 ngOnInit(): void {


   this.setIcon()

}

constructor()
{

}

 setIcon()
{
  if (this.icon == "photo")
  {
      this.activeIcon = this.photo
  }

  if (this.icon == "video")
  {
      this.activeIcon = this.video
  }

  if (this.icon == "note")
  {
      this.activeIcon = this.note
  }
}
}
