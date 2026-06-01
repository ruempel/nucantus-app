import {Component, inject, signal} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-name-input-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    FormsModule,
    MatDialogActions,
    MatInput,
    MatButton,
    MatDialogClose,
    MatFormField,
    MatLabel
  ],
  templateUrl: './name-input-dialog.html',
  styleUrl: './name-input-dialog.scss'
})
export class NameInputDialog {
  readonly name = signal(inject<string>(MAT_DIALOG_DATA));
  private readonly dialogRef = inject<MatDialogRef<NameInputDialog, string | undefined>>(MatDialogRef);

  close() {
    this.dialogRef.close(this.name());
  }
}
