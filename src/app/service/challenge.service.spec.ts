import { TestBed } from '@angular/core/testing';
import { ChallengeService } from './challenge.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ChallengeService', () => {
    let service: ChallengeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ]
        });
        service = TestBed.inject(ChallengeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
