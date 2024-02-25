


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './components/player/player.component';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import {MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from './components/dialogs/login/login.component';
import { InterseptorService } from './services/interseptor.service';
import { FormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostComponent } from './components/news/post/post.component';
import {MatCardModule} from '@angular/material/card';
import { LeftMobileMenuComponent } from './components/left-mobile-menu/left-mobile-menu.component';
import { PictureSliderDialogComponent } from './components/dialogs/picture-slider-dialog/picture-slider-dialog.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { PhotoComponent } from "./components/photo/photo.component";
import { IconComponent } from "./components/other/icon/icon.component";
import { CommentsComponent } from "./components/news/post/comments/comments.component";

import { GroupsComponent } from './components/groups/groups.component';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@NgModule({
    declarations: [
        AppComponent,
        LeftMobileMenuComponent,
        PictureSliderDialogComponent,
        GroupsComponent

    ],
    providers: [

         { provide: HTTP_INTERCEPTORS,
          useClass: InterseptorService, multi: true ,
          },

    ],
    bootstrap: [AppComponent],
    imports: [

        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        LoginComponent,
        FormsModule,
        MatChipsModule,
        MatInputModule,
        MatSelectModule,
        NgbModule,
        MatCardModule,
        NgbCarouselModule,
        PhotoComponent,
        IconComponent,
        CommentsComponent,
        PlayerComponent,
        PostComponent,


    ]
})
export class AppModule { }
