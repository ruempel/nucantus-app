import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ChallengesComponent} from './challenges.component';
import {provideHttpClient} from "@angular/common/http";
import {provideRouter} from "@angular/router";
import {routes} from "../../app.routes";

describe('ChallengesComponent', () => {
  let component: ChallengesComponent;
  let fixture: ComponentFixture<ChallengesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengesComponent],
      providers: [provideHttpClient(), provideRouter(routes)]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
