import { CommonModule } from '@angular/common';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { Photo, PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-picture-slider-dialog',
  templateUrl: './picture-slider-dialog.component.html',
  styleUrls: ['./picture-slider-dialog.component.css']
})
export class PictureSliderDialogComponent implements OnInit{
  ngOnInit(): void {

  }
	images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);

	constructor(config: NgbCarouselConfig,
    public photoService: PhotoService) {
		// customize default values of carousels used by this component tree
		config.interval = 10000;
		config.wrap = false;
		config.keyboard = false;
		config.pauseOnHover = false;
	}

}
