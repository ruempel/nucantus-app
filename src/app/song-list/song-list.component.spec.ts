import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongListComponent } from './song-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

describe('SongListComponent', () => {
    let component: SongListComponent;
    let fixture: ComponentFixture<SongListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [ SongListComponent ],
                imports: [ HttpClientTestingModule, MatToolbarModule, MatDialogModule, MatIconModule, MatTableModule ]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SongListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
