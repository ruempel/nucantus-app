import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChallengeService } from '../service/challenge.service';
import { Challenge } from '../model/challenge.model';
import { SongService } from '../service/song.service';
import { Song } from '../model/song.model';
import { Subscription, timer } from 'rxjs';

@Component({
    selector: 'app-challenge-list',
    templateUrl: './challenge-list.component.html',
    styleUrls: [ './challenge-list.component.scss' ]
})
export class ChallengeListComponent implements OnInit, OnDestroy {
    public songs: Song[];
    public challenges: Challenge[];
    public displayedColumns: string[] = [ 'artist', 'title', 'challengingPlayer', 'joiningPlayer', 'action' ];
    private refreshSubscription: Subscription | undefined;

    public constructor(
        private songService: SongService,
        private challengeService: ChallengeService
    ) {
        this.songs = [];
        this.challenges = [];
    }

    public ngOnInit(): void {
        this.songService.list().subscribe((songs: Song[]) => {
            this.songs = songs;
        });

        this.refreshSubscription = timer(0, 5_000).subscribe(() => {
            this.challengeService.listAccepted().subscribe((challenges: Challenge[]) => {
                this.challenges = challenges;
            });
        });
    }

    ngOnDestroy() {
        this.refreshSubscription?.unsubscribe();
    }

    public getArtist(songId: number) {
        const filteredSongs = this.songs.filter(song => song.id === songId);
        return filteredSongs.length == 1 ? filteredSongs[0]?.artist : '';
    }

    public getTitle(songId: number) {
        const filteredSongs = this.songs.filter(song => song.id === songId);
        return filteredSongs.length == 1 ? filteredSongs[0]?.title : '';
    }

    public delete(challenge: Challenge) {
        this.challengeService.delete(challenge.id).subscribe(() => {
            // update challenge list after deleting a challenge
            this.challengeService.listAccepted().subscribe((challenges: Challenge[]) => {
                this.challenges = challenges;
            });
        });
    }
}
