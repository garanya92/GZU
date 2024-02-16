import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tag } from 'src/app/services/tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent  implements OnInit {


@Output() onTag: EventEmitter<Tag>  = new EventEmitter<Tag>()
@Input() tag: Tag
@Input() editMode: boolean
constructor()
{

}
  ngOnInit(): void {

      if (this.tag.isSelected == undefined)
         this.tag.isSelected = false;

  }


onSelect()
{

    this.tag.isSelected == false? this.tag.isSelected = true: this.tag.isSelected = false;

    this.onTag.emit(this.tag)

  }


}
