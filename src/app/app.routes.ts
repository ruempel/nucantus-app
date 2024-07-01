import {Routes} from '@angular/router';
import {SongsComponent} from './components/songs/songs.component';
import {ChallengesComponent} from './components/challenges/challenges.component';

export const routes: Routes = [
  {path: 'songs', component: SongsComponent},
  {path: 'challenges', component: ChallengesComponent},
  {path: '', component: SongsComponent}
];
