import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechToSpeechComponent } from './speech-to-speech.component';

describe('SpeechToSpeechComponent', () => {
  let component: SpeechToSpeechComponent;
  let fixture: ComponentFixture<SpeechToSpeechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeechToSpeechComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeechToSpeechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
