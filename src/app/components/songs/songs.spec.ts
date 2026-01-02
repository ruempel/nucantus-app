import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Songs} from './songs';
import {provideZonelessChangeDetection} from '@angular/core';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('Songs', () => {
  let component: Songs;
  let fixture: ComponentFixture<Songs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Songs],
      providers: [provideZonelessChangeDetection(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(Songs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
