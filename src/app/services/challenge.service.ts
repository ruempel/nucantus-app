import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Challenge} from "../models/challenge.model";

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  private url = environment.serviceUrl + 'challenges';

  constructor(private http: HttpClient) {
  }

  listOpen() {
    return this.list('OPEN');
  }

  listAccepted() {
    return this.list('ACCEPTED');
  }

  challenge(songId: number, challengingPlayer: string) {
    return this.http.post(this.url, {songId, challengingPlayer});
  }

  join(challengeId: number, joiningPlayer: string) {
    return this.http.put(this.url + `/${challengeId}`, joiningPlayer);
  }

  delete(challengeId: number) {
    return this.http.delete(this.url + `/${challengeId}`);
  }

  private list(state: 'OPEN' | 'ACCEPTED') {
    return this.http.get<Challenge[]>(this.url + `?state=${state}`);
  }
}
