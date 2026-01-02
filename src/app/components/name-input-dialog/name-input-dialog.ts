import {Component, HostListener, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
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
  name = inject<string>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<NameInputDialog>);

  @HostListener('window:keyup.Enter')
  onDialogClick() {
    this.close();
  }

  close() {
    this.dialogRef.close(this.name);
  }
}
