import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChallengeListComponent } from './challenge-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

describe('ChallengeListComponent', () => {
    let component: ChallengeListComponent;
    let fixture: ComponentFixture<ChallengeListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [ ChallengeListComponent ],
                imports: [ HttpClientTestingModule, MatToolbarModule, MatDialogModule, MatIconModule, MatTableModule ]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChallengeListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
