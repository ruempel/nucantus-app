import { Component, OnInit } from '@angular/core';
import { Song } from '../model/song.model';
import { SongService } from '../service/song.service';
import { Challenge } from '../model/challenge.model';
import { ChallengeService } from '../service/challenge.service';
import { MatDialog } from '@angular/material/dialog';
import { NameInputDialogComponent } from '../name-input-dialog/name-input-dialog.component';

@Component({
    selector: 'app-song-list',
    templateUrl: './song-list.component.html',
    styleUrls: [ './song-list.component.scss' ]
})
export class SongListComponent implements OnInit {
    public name: string;
    public songs: Song[];
    public challenges: Challenge[];
    public displayedColumns: string[] = [ 'artist', 'title', 'action' ];

    public constructor(
        private songService: SongService,
        private challengeService: ChallengeService,
        private dialog: MatDialog
    ) {
        this.name = 'Guest'; // TODO save/load user name from/to session
        this.songs = [];
        this.challenges = [];
    }

    public ngOnInit(): void {
        this.songService.list().subscribe((songs: Song[]) => {
            this.songs = songs;
        });
        this.challengeService.listOpen().subscribe((challenges: Challenge[]) => {
            this.challenges = challenges;
        });
    }

    public openDialog(): void {
        const dialogRef = this.dialog.open(NameInputDialogComponent, {
            data: this.name
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.name = result;
            }
        });
    }

    public getChallenges(song: Song): Challenge[] {
        return this.challenges.filter(challenge => challenge.songId === song.id);
    }

    public challenge(song: Song) {
        this.challengeService.challenge(song.id, this.name).subscribe(() => {
            // update challenge list after challenging a song
            this.challengeService.listOpen().subscribe((challenges: Challenge[]) => {
                this.challenges = challenges;
            });
        });
    }

    public join(challenge: Challenge) {
        this.challengeService.join(challenge.id, this.name).subscribe(() => {
            // update challenge list after joining a challenge
            this.challengeService.listOpen().subscribe((challenges: Challenge[]) => {
                this.challenges = challenges;
            });
        });
    }
}
