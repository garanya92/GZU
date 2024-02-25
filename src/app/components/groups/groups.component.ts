
import { Plugins } from '@capacitor/core';


import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { UserService } from 'src/app/services/user.service';
import { BackgroundRunner } from '@capacitor/background-runner';
import { Directory } from '@capacitor/filesystem';








const APP_DIRECTORY = Directory.Documents

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent  implements OnInit {


  folderContent = []
  currentFolder = ''
  copyFile = null

  constructor(public userService: UserService,
   )
  {
     this.init()
      }
  ngOnInit(): void {


  }


init()
{
    let permissions = BackgroundRunner.requestPermissions(
      { apis: ["geolocation", 'notifications']}
    )
  console.log(permissions)

  }

  test()
  {
      let result   = BackgroundRunner.dispatchEvent(
        {
          label: 'com.gzu.uman.app.check',
          event: 'test',
          details : {}
        }
      )

        console.log("groups"+ result)
    }



  async  schedule() {



    }



}
