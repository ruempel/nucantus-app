import {Routes} from '@angular/router';
import {Songs} from './components/songs/songs';
import {Challenges} from './components/challenges/challenges';

export const routes: Routes = [
  {path: 'songs', component: Songs},
  {path: 'challenges', component: Challenges},
  {path: '', component: Songs}
];
