import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-name-input-dialog',
    templateUrl: './name-input-dialog.component.html',
    styleUrls: [ './name-input-dialog.component.scss' ]
})
export class NameInputDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public name: string,
        private dialogRef: MatDialogRef<NameInputDialogComponent>
    ) {
    }

    @HostListener('window:keyup.Enter', [ '$event' ])
    onDialogClick(): void {
        this.close();
    }

    close(): void {
        this.dialogRef.close(this.name);
    }
}
