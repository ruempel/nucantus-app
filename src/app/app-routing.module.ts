import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SongListComponent} from './song-list/song-list.component';
import {ChallengeListComponent} from './challenge-list/challenge-list.component';

const routes: Routes = [
  {path: 'songs', component: SongListComponent},
  {path: 'challenges', component: ChallengeListComponent},
  {path: '', component: SongListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
