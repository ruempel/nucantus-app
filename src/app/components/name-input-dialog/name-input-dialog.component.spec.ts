import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NameInputDialogComponent} from './name-input-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('NameInputDialogComponent', () => {
  let component: NameInputDialogComponent;
  let fixture: ComponentFixture<NameInputDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NameInputDialogComponent, NoopAnimationsModule],
      providers: [{provide: MAT_DIALOG_DATA, useValue: {}}, {provide: MatDialogRef, useValue: {}}]
    }).compileComponents();

    fixture = TestBed.createComponent(NameInputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
