import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Challenge } from '../model/challenge.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ChallengeService {
    private url = environment.serviceUrl + 'challenges';

    constructor(private http: HttpClient) {
    }

    private list(state: 'OPEN' | 'ACCEPTED'): Observable<Challenge[]> {
        return this.http.get<Challenge[]>(this.url + `?state=${ state }`);
    }

    public listOpen(): Observable<Challenge[]> {
        return this.list('OPEN');
    }

    public listAccepted(): Observable<Challenge[]> {
        return this.list('ACCEPTED');
    }

    public challenge(songId: number, challengingPlayer: string): Observable<any> {
        return this.http.post(this.url, { songId, challengingPlayer });
    }

    public join(challengeId: number, joiningPlayer: string): Observable<any> {
        return this.http.put(this.url + `/${ challengeId }`, joiningPlayer);
    }

    public delete(challengeId: number): Observable<any> {
        return this.http.delete(this.url + `/${ challengeId }`);
    }
}
