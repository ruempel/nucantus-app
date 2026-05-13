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
  MatHeaderRowDef,
  MatNoDataRow,
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
  readonly displayedColumns: string[] = ['artist', 'title', 'challengingPlayer', 'joiningPlayer', 'action'];

  private backend = inject(Backend);
  private subscriptions: Subscription[] = [];

  songs: WritableSignal<Song[]> = signal([]);
  challenges: WritableSignal<Challenge[]> = signal([]);

  async ngOnInit(): Promise<void> {
    this.songs.set(await firstValueFrom(this.backend.listSongs()));
    this.subscriptions.push(timer(0, 5_000).subscribe(() => {
      this.backend.listAcceptedChallenges().subscribe(challenges => {
        this.challenges.set(challenges);
      });
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getArtist(songId: number) {
    return this.songs().find(song => song.id === songId)?.artist ?? '';
  }

  getTitle(songId: number) {
    return this.songs().find(song => song.id === songId)?.title ?? '';
  }

  delete(challenge: Challenge) {
    this.backend.deleteChallenge(challenge.id).subscribe(() => {
      // update the challenge list after deleting a challenge
      this.backend.listAcceptedChallenges().subscribe(challenges => {
        this.challenges.set(challenges);
      });
    });
  }
}
