import { ElementRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ViewPlayerPanelModule { private   bar_el: ElementRef

  constructor( private  bar: ElementRef)
  {
   this.bar_el = bar;
  }

  private isPanelShow = true;

  show_panel(){
    this.isPanelShow = true;
    this.bar_el.nativeElement.style.top = "0"

  }

  hidePanel(){
    this.isPanelShow  = false;
    this.bar_el.nativeElement.style.top = "-3rem"
  }

  setPanel()
  {
         this.isPanelShow == true? this.isPanelShow = false: this.isPanelShow = true
         if (this.isPanelShow)
         {
              this.show_panel()
         }

     else{
        this.hidePanel()
     }
       }

       getStatus()
       {
        return this.isPanelShow;
       }

       showTempPanel()
       {

              this.show_panel()
              setTimeout(()=>
              {
                    this.hidePanel()
              }, 5000)

       }


}
