import { TestBed } from '@angular/core/testing';

import { SongService } from './song.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SongService', () => {
    let service: SongService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ]
        });
        service = TestBed.inject(SongService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
