import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NameInputDialogComponent } from './name-input-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

describe('NameInputDialogComponent', () => {
    let component: NameInputDialogComponent;
    let fixture: ComponentFixture<NameInputDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [ NameInputDialogComponent ],
                imports: [
                    HttpClientTestingModule,
                    MatToolbarModule,
                    MatDialogModule,
                    MatFormFieldModule,
                    MatInputModule,
                    NoopAnimationsModule,
                    FormsModule
                ],
                providers: [
                    { provide: MAT_DIALOG_DATA, useValue: {} },
                    { provide: MatDialogRef, useValue: {} }
                ]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NameInputDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
