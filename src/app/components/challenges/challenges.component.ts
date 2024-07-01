import {Component, OnDestroy, OnInit} from '@angular/core';
import {Song} from '../../models/song.model';
import {Challenge} from '../../models/challenge.model';
import {Subscription, timer} from 'rxjs';
import {SongService} from '../../services/song.service';
import {ChallengeService} from '../../services/challenge.service';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-challenges',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    RouterLink,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatIcon
  ],
  templateUrl: './challenges.component.html',
  styleUrl: './challenges.component.scss'
})
export class ChallengesComponent implements OnInit, OnDestroy {
  songs: Song[];
  challenges: Challenge[];
  displayedColumns: string[] = ['artist', 'title', 'challengingPlayer', 'joiningPlayer', 'action'];
  private refreshSubscription: Subscription | undefined;

  constructor(
    private songService: SongService,
    private challengeService: ChallengeService
  ) {
    this.songs = [];
    this.challenges = [];
  }

  ngOnInit() {
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

  getArtist(songId: number) {
    const filteredSongs = this.songs.filter(song => song.id === songId);
    return filteredSongs.length == 1 ? filteredSongs[0]?.artist : '';
  }

  getTitle(songId: number) {
    const filteredSongs = this.songs.filter(song => song.id === songId);
    return filteredSongs.length == 1 ? filteredSongs[0]?.title : '';
  }

  delete(challenge: Challenge) {
    this.challengeService.delete(challenge.id).subscribe(() => {
      // update challenge list after deleting a challenge
      this.challengeService.listAccepted().subscribe((challenges: Challenge[]) => {
        this.challenges = challenges;
      });
    });
  }
}
