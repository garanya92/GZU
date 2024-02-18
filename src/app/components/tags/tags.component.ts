import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Track } from 'src/app/services/audio.service';
import { Tag, TagService } from 'src/app/services/tag.service';
import { UserService } from 'src/app/services/user.service';
import { TagComponent } from './tag/tag.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
  standalone: true,
  imports: [TagComponent, CommonModule]
})
export class TagsComponent implements OnInit{

  @Input() editMode = false;
  @Input() selectedTagsInTrack: string[]

  tagTittle: string
  @Output() onSelectedTagsListStr = new EventEmitter<any>()
  @Output() onSelectedTag  = new EventEmitter<Tag>()
  inputTrackTags:string[]

  @Input() inputTags: Tag[]


  constructor(private tagService: TagService,
   private  userService: UserService)
  {

  }


  //Отримуємо клікнутий тег
  onSelect(tag: Tag)
  {


          this.onSelectedTag.emit(tag)


  }


  ngOnInit(): void {


    console.log(this.selectedTagsInTrack)


  }








}





