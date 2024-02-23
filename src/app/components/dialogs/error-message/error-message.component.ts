import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IconComponent } from '../../other/icon/icon.component';


@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [MatButtonModule, IconComponent],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css'
})
export class ErrorMessageComponent implements OnInit{

 @Input() message: string
 @Output() onResponse: EventEmitter<boolean> = new EventEmitter<boolean>()

constructor()
{

}
  ngOnInit(): void {

  this.message = "Упс.. Щось пішло не так. Можливо не має підключення інтернету, або проблеми на сервері!"

  }




}
