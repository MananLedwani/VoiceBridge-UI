import { Component } from '@angular/core';
import { signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApisService } from '../../service/apis.service';
import { TranscriptionResponse } from '../../models/speech-to-text';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderComponent } from '../loader/loader.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-speech-to-text',
  imports: [CommonModule, FormsModule, LoaderComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './speech-to-text.component.html',
  styleUrl: './speech-to-text.component.scss'
})
export class SpeechToTextComponent {
  selectedFile: File | null = null;
  selectedLanguage: string = 'sa'; 
  transcribedText: string = '';
  isLoading: WritableSignal<boolean> = signal(false);
  errorMessage: string = '';

  readonly MAX_SIZE_MB = 5;
  readonly ALLOWED_EXTENSIONS = ['wav', 'mp3', 'flac'];

  constructor(private apiService: ApisService, private messageService: MessageService) {}

  showSuccess(message: string): void{
     this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string): void{
     this.messageService.add({ severity: 'error', summary: 'Error', detail: message});
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.errorMessage = '';
    this.transcribedText = '';

    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > this.MAX_SIZE_MB) {
        this.errorMessage = `File is too large (${fileSizeMB.toFixed(2)} MB). Max limit is ${this.MAX_SIZE_MB} MB.`;
        this.showError(this.errorMessage);
        this.selectedFile = null;
        event.target.value = ''; 
        return;
      }

      const extension = file.name.split('.').pop()?.toLowerCase();
      if (!extension || !this.ALLOWED_EXTENSIONS.includes(extension)) {
        this.errorMessage = `Invalid file type. Allowed: ${this.ALLOWED_EXTENSIONS.join(', ')}`;
        this.showError(this.errorMessage);
        this.selectedFile = null;
        event.target.value = '';
        return;
      }

      this.selectedFile = file;
    }
  }

  convert(): void {
    if (!this.selectedFile) {
      this.errorMessage = "Please select a file first.";
      this.showError(this.errorMessage);
      return;
    }

    this.isLoading.set(true);
    this.errorMessage = '';
    this.transcribedText = '';

    this.apiService.transcribeAudio(this.selectedFile, this.selectedLanguage)
      .subscribe({
        next: (response: TranscriptionResponse) => {
          this.transcribedText = response.transcription || "No speech detected.";
          this.isLoading.set(false);
        },
        error: (error: HttpErrorResponse) => {
          console.error("Transcription failed", error);
          this.errorMessage = error.error?.detail || "Transcription failed. Please try again.";
          this.isLoading.set(false);
          this.showError(this.errorMessage);
        }
      });
  }
}