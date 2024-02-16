import { WsServiceService } from './../../../services/ws-service.service';
import { Component, ElementRef, OnInit, ViewChild , Inject} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { User, UserService } from 'src/app/services/user.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { Container } from 'src/app/services/entity.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,
    MatButtonModule, MatIconModule, NgIf],
})
export class LoginComponent implements OnInit {


  password: string
  login:string
  user:User

  messageError: string
  constructor( @Inject (MAT_DIALOG_DATA) public data: {"user": User},
   private userService: UserService, public dialogRef: MatDialogRef<LoginComponent>,
   private wsServiceService: WsServiceService)
  {

  }


  ngOnInit(): void {




  }


 onLogin()
 {

      this.user = {id: 0,
       login: this.login, password: this.password, avatar_path: "",
       email: ""
     }


        if (this.login.length < 3 || this.password.length < 6)
        {
              this.messageError = "Логін або пароль занадто короткий!"
              return
        }


     this.userService.post(this.user, "/api/auth/login" ).subscribe((reposnse)=>
     {
          let container: Container = reposnse
          console.log(reposnse)
          if (container.status == false)
          {
                this.messageError = container.errorMessage
          }

          else{
              this.user = container.entity
              if (this.wsServiceService.isConnected)
              {    //Перереєстровуємо юзера в онлайн на сервері
                //   this.wsServiceService.sendMessage("/app/reg_user", this.user.id.toString())
              }

              this.dialogRef.close(this.user)
              this.userService.setUser(this.user)
          }
     })
 }


}
