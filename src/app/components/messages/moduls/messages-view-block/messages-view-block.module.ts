import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdaptiveService } from 'src/app/services/adaptive.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

/**
 * Клас, в якому відбуваєтья контроль за візуальною компоновкою
 * компоненту Messages.
 * Мобільний/Десктопний вигляд .
 * Перехід між списком чатів та самим полем  повідомлення
 * в мобільній версії
 */
export class MessagesViewBlockModule {


  public  isChatsUsersActive = false;
  public   isShowMessagesBlock = true;
  public   isShowChatsUserBlock = true;



   constructor(private adaptiveService: AdaptiveService)
   {
          adaptiveService.changeModeStream().subscribe((mobileMode)=>{
               if (mobileMode)
               {
                  this.setMobileMode()
               }

                else{
                   this.setDesktopMode()
                }

              })

       if (this.adaptiveService.isMobileMode)
       {
         this.setMobileMode()
       }
       else{
         this.setDesktopMode()
       }




   }

   /**
    * показуємо блок з чатами
    */
   showChatUsersBlock()
   {
        if (this.adaptiveService.isMobileMode && this.isChatsUsersActive == false)
        {
            this.isShowChatsUserBlock = true
              this.isShowMessagesBlock = false
              this.isChatsUsersActive = true

          }

        }

 /**
  * Ховаємо блок з чатами
  */
hideChatUsersBlock()
{

       if(this.adaptiveService.isMobileMode == true)
       {
           this.isShowChatsUserBlock = false
           this.isShowMessagesBlock = true
           this.isChatsUsersActive = false;
       }
}

   setDesktopMode()
   {
      this.isShowChatsUserBlock = true
      this.isShowMessagesBlock = true
   }

   setMobileMode()
   {
     this.isShowChatsUserBlock = true;
     this.isShowMessagesBlock = false;
   }




 }
