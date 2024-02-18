import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID, ViewChild } from '@angular/core';


export interface InfiniteScrollOptions {
  [key: string]: any;

  root: any;
}



@Component({
  selector: 'app-infinity-scroll',
  templateUrl: './infinity-scroll.component.html',
  styleUrls: ['./infinity-scroll.component.css'],
  standalone: true
})
export class InfinityScrollComponent implements AfterViewInit ,OnInit{

  @Input() options: Partial<InfiniteScrollOptions> = {};

  /**
   * Event emitter scrolled
   */
  @Output() scrolled = new EventEmitter<void>();

  /**
   * Bottom anchor for emit scroll
   */
  @ViewChild('anchor', {static: false}) anchor: ElementRef<HTMLElement>;



  constructor(
    private host: ElementRef,
    /* tslint:disable-next-line:ban-types */
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
observer: any

  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(([entry]) => entry.isIntersecting && this.scrolled.emit(), {

    });
    this.observer.observe(this.anchor.nativeElement);
  }





}
