import { User, UserService } from './../../services/user.service';
import { Container, Paginator } from './../../services/entity.service';
import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { UserItemComponent } from '../user-item/user-item.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-peoples',
  templateUrl: './peoples.component.html',
  styleUrls: ['./peoples.component.css'],
  standalone: true,
  imports: [MatTabsModule, UserItemComponent, CommonModule]
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
