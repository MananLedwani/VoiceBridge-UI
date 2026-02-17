import { Component, OnDestroy } from '@angular/core';
import { signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApisService } from '../../service/apis.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-text-to-speech',
  imports: [CommonModule, FormsModule, LoaderComponent],
  templateUrl: './text-to-speech.component.html',
  styleUrl: './text-to-speech.component.scss'
})
export class TextToSpeechComponent implements OnDestroy {
  inputText: string = '';
  selectedLanguage: string = 'sa'; 
  
  audioUrl: string | null = null;
  isLoading: WritableSignal<boolean> = signal(false);
  errorMessage: string = '';

  constructor(private apiService: ApisService) {}

  generateAudio(): void {
    if (!this.inputText.trim()) {
      this.errorMessage = "Please enter some text.";
      return;
    }

    this.isLoading.set(true);
    this.errorMessage = '';
    this.cleanupAudio(); // Clear previous audio

    this.apiService.generateSpeech(this.inputText, this.selectedLanguage).subscribe({
      next: (blob: Blob) => {
        // Create a URL for the blob to play/download it
        this.audioUrl = URL.createObjectURL(blob);
        this.isLoading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        console.error("TTS Failed", error);
        this.errorMessage = "Failed to generate audio. Please try again.";
        this.isLoading.set(false);
      }
    });
  }

  // Helper to free memory when component destroys or new audio is generated
  cleanupAudio() {
    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
      this.audioUrl = null;
    }
  }

  ngOnDestroy(): void {
    this.cleanupAudio();
  }
}