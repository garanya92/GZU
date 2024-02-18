import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../dialogs/login/login.component';
import { User } from 'src/app/services/user.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-need-login-lable',
  templateUrl: './need-login-lable.component.html',
  styleUrls: ['./need-login-lable.component.css']
  ,standalone: true,
  imports: [MatButtonModule]
})
export class NeedLoginLableComponent {

  @Output() onClose: EventEmitter<User> = new EventEmitter<User>()
  @Input() message: string

  constructor(private diaolg: MatDialog)
 {

 }

  openLogin()
  {
     this.diaolg.open(LoginComponent).afterClosed().subscribe((response)=>{
      this.onClose.emit(response)

     })
  }

}
