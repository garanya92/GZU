import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessagesViewBlockModule } from '../components/messages/moduls/messages-view-block/messages-view-block.module';

@Injectable({
  providedIn: 'root'
})
export class AdaptiveService {

isMobileMode = false;
private streamIsMobileMode = false;
isMenuShowed = true;
private  messegesViewBlock: MessagesViewBlockModule

  constructor() {


    if (window.innerHeight < window.innerWidth)
    {
       this.isMobileMode = false;
    }
    else{
        this.isMobileMode = true
    }


    window.addEventListener("resize", (()=>
    {
           if (window.innerHeight < window.innerWidth)
           {
                if (this.isMobileMode == true)
                {
                  this.isMobileMode = false
                  console.log("MobileMode = false")
                }

           }

           else{
                 if (this.isMobileMode == false)
                 {
                  this.isMobileMode = true
                  console.log("MobileMode = true")
                 }
           }
    }))


  }




  setMenu()
  {
       if (this.isMobileMode)
     this.isMenuShowed == true? this.isMenuShowed =  false : this.isMenuShowed = true;
     console.log("menu is" + this.isMenuShowed)
    }


getStatusBlur()
{
         if (this.isMobileMode == true)
         {
            return this.isMenuShowed
         }

          return false;
        }


changeModeStream()
{
    let stream = new Observable((observe)=>{

        window.addEventListener("resize", ()=>
        {

          if (window.innerHeight < window.innerWidth  && this.streamIsMobileMode)
          {
             this.streamIsMobileMode = false
              observe.next(false)


          }
          if (window.innerHeight > window.innerWidth && this.streamIsMobileMode == false)
          {   this.streamIsMobileMode = true
              observe.next(true)
          }


        }

        )

    })

    return stream;
  }


}
