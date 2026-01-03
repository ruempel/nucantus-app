import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Challenges} from './challenges';
import {provideRouter} from '@angular/router';

describe('Challenges', () => {
  let component: Challenges;
  let fixture: ComponentFixture<Challenges>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Challenges],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Challenges);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
