import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Challenge} from '../models/challenge.model';
import {Song} from '../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class Backend {
  private URL_CHALLENGES = environment.serviceUrl + 'challenges';
  private URL_SONGS = environment.serviceUrl + 'songs';
  private http = inject(HttpClient);

  listSongs() {
    return this.http.get<Song[]>(this.URL_SONGS);
  }

  listOpenChallenges() {
    return this.listChallenges('OPEN');
  }

  listAcceptedChallenges() {
    return this.listChallenges('ACCEPTED');
  }

  private listChallenges(state: 'OPEN' | 'ACCEPTED') {
    return this.http.get<Challenge[]>(this.URL_CHALLENGES + `?state=${state}`);
  }

  challengePlayer(songId: number, challengingPlayer: string) {
    return this.http.post(this.URL_CHALLENGES, {songId, challengingPlayer});
  }

  joinChallenge(challengeId: number, joiningPlayer: string) {
    return this.http.put(this.URL_CHALLENGES + `/${challengeId}`, joiningPlayer);
  }

  deleteChallenge(challengeId: number) {
    return this.http.delete(this.URL_CHALLENGES + `/${challengeId}`);
  }
}
