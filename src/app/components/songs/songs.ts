import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {Song} from '../../models/song.model';
import {Challenge} from '../../models/challenge.model';
import {MatDialog} from '@angular/material/dialog';
import {NameInputDialog} from '../name-input-dialog/name-input-dialog';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
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
import {firstValueFrom} from 'rxjs';
import {Backend} from '../../services/backend';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-songs',
  imports: [
    MatToolbar,
    MatButton,
    RouterLink,
    MatIcon,
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
    FormsModule
  ],
  templateUrl: './songs.html',
  styleUrl: './songs.scss'
})
export class Songs implements OnInit {
  private backend = inject(Backend);
  private dialog = inject(MatDialog);

  name = signal('Guest');
  songs: WritableSignal<Song[]> = signal([]);
  challenges: WritableSignal<Challenge[]> = signal([]);
  displayedColumns: string[] = ['artist', 'title', 'action'];

  async ngOnInit(): Promise<void> {
    this.songs.set(await firstValueFrom(this.backend.listSongs()));
    this.challenges.set(await firstValueFrom(this.backend.listOpenChallenges()));
  }

  openDialog() {
    const dialogRef = this.dialog.open(NameInputDialog, {
      data: this.name()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.name.set(result);
      }
    });
  }

  getChallenges(song: Song) {
    return this.challenges().filter(challenge => challenge.songId === song.id);
  }

  challenge(song: Song) {
    this.backend.challengePlayer(song.id, this.name()).subscribe(() => {
      // update challenge list after challenging a song
      this.backend.listOpenChallenges().subscribe((challenges: Challenge[]) => {
        this.challenges.set(challenges);
      });
    });
  }

  join(challenge: Challenge) {
    this.backend.joinChallenge(challenge.id, this.name()).subscribe(() => {
      // update the challenge list after joining a challenge
      this.backend.listOpenChallenges().subscribe((challenges: Challenge[]) => {
        this.challenges.set(challenges);
      });
    });
  }
}
