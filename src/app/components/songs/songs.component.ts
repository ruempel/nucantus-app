import {Component, OnInit} from '@angular/core';
import {Song} from '../../models/song.model';
import {Challenge} from '../../models/challenge.model';
import {ChallengeService} from '../../services/challenge.service';
import {SongService} from '../../services/song.service';
import {NameInputDialogComponent} from '../name-input-dialog/name-input-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatToolbar} from '@angular/material/toolbar';
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
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatTable,
    MatColumnDef,
    MatButton,
    RouterLink,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderCellDef,
    MatCellDef
  ],
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.scss'
})
export class SongsComponent implements OnInit {
  name: string;
  songs: Song[];
  challenges: Challenge[];
  displayedColumns: string[] = ['artist', 'title', 'action'];

  constructor(
    private songService: SongService,
    private challengeService: ChallengeService,
    private dialog: MatDialog
  ) {
    this.name = 'Guest'; // TODO save/load user name from/to session
    this.songs = [];
    this.challenges = [];
  }

  ngOnInit() {
    this.songService.list().subscribe((songs: Song[]) => {
      this.songs = songs;
    });
    this.challengeService.listOpen().subscribe((challenges: Challenge[]) => {
      this.challenges = challenges;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(NameInputDialogComponent, {
      data: this.name
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.name = result;
      }
    });
  }

  getChallenges(song: Song) {
    return this.challenges.filter(challenge => challenge.songId === song.id);
  }

  challenge(song: Song) {
    this.challengeService.challenge(song.id, this.name).subscribe(() => {
      // update challenge list after challenging a song
      this.challengeService.listOpen().subscribe((challenges: Challenge[]) => {
        this.challenges = challenges;
      });
    });
  }

  join(challenge: Challenge) {
    this.challengeService.join(challenge.id, this.name).subscribe(() => {
      // update challenge list after joining a challenge
      this.challengeService.listOpen().subscribe((challenges: Challenge[]) => {
        this.challenges = challenges;
      });
    });
  }
}
