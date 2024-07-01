import {Component, HostListener, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-name-input-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInput,
    FormsModule,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatLabel
  ],
  templateUrl: './name-input-dialog.component.html',
  styleUrl: './name-input-dialog.component.scss'
})
export class NameInputDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public name: string,
    private dialogRef: MatDialogRef<NameInputDialogComponent>
  ) {
  }

  @HostListener('window:keyup.Enter', ['$event'])
  onDialogClick() {
    this.close();
  }

  close() {
    this.dialogRef.close(this.name);
  }
}
