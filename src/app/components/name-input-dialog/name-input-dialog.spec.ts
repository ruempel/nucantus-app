import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NameInputDialog} from './name-input-dialog';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

describe('NameInputDialog', () => {
  let component: NameInputDialog;
  let fixture: ComponentFixture<NameInputDialog>;

  beforeEach(async () => {
    const dialogRefMock = {close: vi.fn()};
    const dialogDataMock = {name: ''};

    await TestBed.configureTestingModule({
      imports: [NameInputDialog],
      providers: [
        {provide: MatDialogRef, useValue: dialogRefMock},
        {provide: MAT_DIALOG_DATA, useValue: dialogDataMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NameInputDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
