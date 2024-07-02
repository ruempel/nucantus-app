import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SongsComponent} from './songs.component';
import {provideHttpClient} from "@angular/common/http";
import {provideRouter} from "@angular/router";
import {routes} from "../../app.routes";

describe('SongsComponent', () => {
  let component: SongsComponent;
  let fixture: ComponentFixture<SongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongsComponent],
      providers: [provideHttpClient(), provideRouter(routes)]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
