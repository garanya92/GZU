import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { AdaptiveService } from 'src/app/services/adaptive.service';
import { ChatService } from 'src/app/services/chat.service';
import { User, UserService } from 'src/app/services/user.service';
import { LoginComponent } from '../dialogs/login/login.component';

@Component({
  selector: 'app-left-mobile-menu',
  templateUrl: './left-mobile-menu.component.html',
  styleUrls: ['./left-mobile-menu.component.css']
})
export class LeftMobileMenuComponent implements OnInit {
  private offcanvasService = inject(NgbOffcanvas);
	closeResult = '';

  user:User

constructor(public chatService: ChatService,
  public adaptiveService: AdaptiveService,
  public userService: UserService,
  private matDialoge: MatDialog)
{

}
  ngOnInit(): void {
    this.user = this.userService.getUser()
  }



	open(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case OffcanvasDismissReasons.ESC:
				return 'by pressing ESC';
			case OffcanvasDismissReasons.BACKDROP_CLICK:
				return 'by clicking on the backdrop';
			default:
				return `with: ${reason}`;
		}
	}



  openLoginDialog()
  {
       if (!this.userService.isUserExist())
       {
        this.matDialoge.open(LoginComponent)
       }

  }



}
