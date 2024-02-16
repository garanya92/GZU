import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicComponent } from './components/music/music.component';
import { PeoplesComponent } from './components/peoples/peoples.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NewsComponent } from './components/news/news.component';
import { GroupsComponent } from './components/groups/groups.component';
import { UserPageComponent } from './components/user-page/user-page.component';

const routes: Routes = [
  {path: "music", component: MusicComponent},
  {path: "peoples", component: PeoplesComponent},
  {path: "messages/:id", component: MessagesComponent},
  {path: "news", component: NewsComponent},
  {path: "groups", component: GroupsComponent},
  {path: "user/:id" , component: UserPageComponent},
 {path: "", component: NewsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
