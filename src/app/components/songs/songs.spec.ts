import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Songs} from './songs';
import {provideRouter} from '@angular/router';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('Songs', () => {
  let component: Songs;
  let fixture: ComponentFixture<Songs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Songs],
      providers: [provideRouter([]), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(Songs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
