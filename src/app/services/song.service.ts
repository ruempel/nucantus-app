import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Song} from "../models/song.model";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private url = environment.serviceUrl + 'songs';

  constructor(private http: HttpClient) {
  }

  list() {
    return this.http.get<Song[]>(this.url);
  }
}
