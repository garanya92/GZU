import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/services/user.service';

@Component({
  selector: 'app-peoples-list-dialog',
  templateUrl: './peoples-list-dialog.component.html',
  styleUrls: ['./peoples-list-dialog.component.css']
})
export class PeoplesListDialogComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: {"users": User[]})
  {

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
