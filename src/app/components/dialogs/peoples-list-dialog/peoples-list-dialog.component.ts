import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/services/user.service';
import { UserItemComponent } from '../../user-item/user-item.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-peoples-list-dialog',
  templateUrl: './peoples-list-dialog.component.html',
  styleUrls: ['./peoples-list-dialog.component.css'],
  standalone: true,
  imports: [UserItemComponent, CommonModule, MatButtonModule]
})
export class PeoplesListDialogComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: {"users": User[]})
  {

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
