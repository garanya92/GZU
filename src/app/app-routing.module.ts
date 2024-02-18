import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicComponent } from './components/music/music.component';
import { PeoplesComponent } from './components/peoples/peoples.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NewsComponent } from './components/news/news.component';
import { GroupsComponent } from './components/groups/groups.component';
import { UserPageComponent } from './components/user-page/user-page.component';

const routes: Routes = [

  {path: "music", loadComponent: ()=>  import('./components/music/music.component').then(m=>
    m.MusicComponent)},
  {path: "peoples",  loadComponent: ()=> import('./components/peoples/peoples.component').then(
    m => m.PeoplesComponent)},
  {path: "messages/:id", loadComponent: ()=> import('./components/messages/messages.component').then(
    m => m.MessagesComponent)},
  {path: "news", loadComponent: ()=> import('./components/news/news.component').then
  (m => m.NewsComponent)},
  {path: "groups", component: GroupsComponent},
  {path: "user/:id" , loadComponent: ()=> import('./components/user-page/user-page.component').then
  (m => m.UserPageComponent)},
 {path: "", loadComponent: ()=> import('./components/news/news.component').then
 (m=> m.NewsComponent) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
