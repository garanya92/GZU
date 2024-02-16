import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MusicComponent } from './components/music/music.component';
import { NewsComponent } from './components/news/news.component';
import { PeoplesComponent } from './components/peoples/peoples.component';
import { PlayerComponent } from './components/player/player.component';
import { TrackComponent } from './components/track/track.component';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { CutStringPipe } from './pipes/cut-string.pipe';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LoginComponent } from './components/dialogs/login/login.component';
import { InterseptorService } from './services/interseptor.service';
import { NeedLoginLableComponent } from './components/need-login-lable/need-login-lable.component';
import { UploadTrackComponent } from './components/dialogs/upload-track/upload-track.component';
import { EditTrackComponent } from './components/dialogs/edit-track/edit-track.component';
import { FormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import { TagsComponent } from './components/tags/tags.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { TagComponent } from './components/tags/tag/tag.component';
import { MessagesComponent } from './components/messages/messages.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { PeoplesListDialogComponent } from './components/dialogs/peoples-list-dialog/peoples-list-dialog.component';
import { MesssageComponent } from './components/messages/messsage/messsage.component';
import { ChatComponent } from './components/messages/chat/chat.component';
import { ChatUsersComponent } from './components/messages/chat-users/chat-users.component';
import { InfinityScrollComponent } from './components/other/infinity-scroll/infinity-scroll.component';
import { UserAudioComponent } from './components/music/user-audio/user-audio.component';
import { AddFilesComponent } from './components/other/add-files/add-files.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostComponent } from './components/news/post/post.component';
import {MatCardModule} from '@angular/material/card';
import { GroupsComponent } from './components/groups/groups.component';
import { LeftMobileMenuComponent } from './components/left-mobile-menu/left-mobile-menu.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { CreatePostComponent } from './components/news/create-post/create-post.component';
import { UserPhotosComponent } from './components/user-page/user-photos/user-photos.component';
import { PictureSliderDialogComponent } from './components/dialogs/picture-slider-dialog/picture-slider-dialog.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { PhotoComponent } from "./components/photo/photo.component";




@NgModule({
    declarations: [
        AppComponent,
        MusicComponent,
        NewsComponent,
        PeoplesComponent,
        PlayerComponent,
        CutStringPipe,
        NeedLoginLableComponent,
        EditTrackComponent,
        TagsComponent,
        TagComponent,
        MessagesComponent,
        UserItemComponent,
        PeoplesListDialogComponent,
        MesssageComponent,
        ChatComponent,
        ChatUsersComponent,
        InfinityScrollComponent,
        UserAudioComponent,
        AddFilesComponent,
        TrackComponent,
        PostComponent,
        GroupsComponent,
        LeftMobileMenuComponent,
        UserPageComponent,
        CreatePostComponent,
        UserPhotosComponent,
        PictureSliderDialogComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: InterseptorService, multi: true }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatSliderModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        LoginComponent,
        MatTabsModule,
        MatProgressSpinnerModule,
        FormsModule,
        MatChipsModule,
        MatInputModule,
        MatSelectModule,
        MatExpansionModule,
        NgbModule,
        MatCardModule,
        NgbCarouselModule,
        PhotoComponent
    ]
})
export class AppModule { }
