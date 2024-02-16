import { User, UserService } from './../../services/user.service';
import { Container, Paginator } from './../../services/entity.service';
import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-peoples',
  templateUrl: './peoples.component.html',
  styleUrls: ['./peoples.component.css']
})
export class PeoplesComponent implements OnInit {


   users: User[];
   counts: number = 0

   constructor(private audioService: AudioService, private userService: UserService)
   {

   }

  ngOnInit(): void {

    this.userService.get("/api/general/get_all_users/0/10").subscribe((container: Container)=>
    {
       console.log(container)
       this.users = container.entity
       this.counts = container.totalElements

    })



  }



}
