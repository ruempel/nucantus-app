import {Component, inject, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {Song} from '../../models/song.model';
import {Challenge} from '../../models/challenge.model';
import {firstValueFrom, Subscription, timer} from 'rxjs';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {Backend} from '../../services/backend';

@Component({
  selector: 'app-challenges',
  imports: [
    MatTable,
    MatIcon,
    MatToolbar,
    MatButton,
    RouterLink,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatNoDataRow
  ],
  templateUrl: './challenges.html',
  styleUrl: './challenges.scss'
})
export class Challenges implements OnInit, OnDestroy {
  private backend = inject(Backend);

  songs: WritableSignal<Song[]> = signal([]);
  challenges: WritableSignal<Challenge[]> = signal([]);
  displayedColumns: string[] = ['artist', 'title', 'challengingPlayer', 'joiningPlayer', 'action'];
  private refreshSubscription: Subscription | undefined;

  async ngOnInit(): Promise<void> {
    this.songs.set(await firstValueFrom(this.backend.listSongs()));
    this.refreshSubscription = timer(0, 5_000).subscribe(() => {
      this.backend.listAcceptedChallenges().subscribe((challenges: Challenge[]) => {
        this.challenges.set(challenges);
      });
    });
  }

  ngOnDestroy(): void {
    this.refreshSubscription?.unsubscribe();
  }

  getArtist(songId: number) {
    const filteredSongs = this.songs().filter(song => song.id === songId);
    return filteredSongs.length == 1 ? filteredSongs[0]?.artist : '';
  }

  getTitle(songId: number) {
    const filteredSongs = this.songs().filter(song => song.id === songId);
    return filteredSongs.length == 1 ? filteredSongs[0]?.title : '';
  }

  delete(challenge: Challenge) {
    this.backend.deleteChallenge(challenge.id).subscribe(() => {
      // update the challenge list after deleting a challenge
      this.backend.listAcceptedChallenges().subscribe((challenges: Challenge[]) => {
        this.challenges.set(challenges);
      });
    });
  }
}
