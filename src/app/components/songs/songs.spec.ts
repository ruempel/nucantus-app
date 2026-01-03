import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Songs} from './songs';
import {provideRouter} from '@angular/router';

describe('Songs', () => {
  let component: Songs;
  let fixture: ComponentFixture<Songs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Songs],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Songs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
