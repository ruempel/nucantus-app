import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from '../model/song.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SongService {
    private url = environment.serviceUrl + 'songs';

    public constructor(private http: HttpClient) {
    }

    public list(): Observable<Song[]> {
        return this.http.get<Song[]>(this.url);
    }
}
