import { Component, OnDestroy } from '@angular/core';
import { signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApisService } from '../../service/apis.service';
import { switchMap } from 'rxjs/operators';
import { LoaderComponent } from '../loader/loader.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-speech-to-speech',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './speech-to-speech.component.html',
  styleUrl: './speech-to-speech.component.scss'
})
export class SpeechToSpeechComponent implements OnDestroy {
  selectedFile: File | null = null;
  targetLanguage: string = 'sa'; 
  
  isLoading: WritableSignal<boolean> = signal(false);
  currentStep: string = ''; 
  errorMessage: string = '';
  
  finalAudioUrl: string | null = null;
  
  detectedText: string = '';
  translatedText: string = '';

  constructor(private apiService: ApisService, private messageService: MessageService) {}

  showSuccess(message: string): void{
     this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string): void{
     this.messageService.add({ severity: 'error', summary: 'Error', detail: message});
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        this.errorMessage = "File is too large. Max 5MB.";
        this.showError(this.errorMessage);
        return;
      }
      this.selectedFile = file;
      this.errorMessage = '';
      this.cleanupAudio(); 
    }
  }

  processSpeechToSpeech(): void {
    if (!this.selectedFile) {
      this.errorMessage = "Please select an audio file first.";
      this.showError(this.errorMessage);
      return;
    }

    this.isLoading.set(true);
    this.errorMessage = '';
    this.currentStep = 'Initializing...';

    const sourceLanguage = this.targetLanguage === 'sa' ? 'hi' : 'sa';


    this.currentStep = 'Step 1/3: Transcribing Audio...';
    
    this.apiService.transcribeAudio(this.selectedFile, sourceLanguage).pipe(
      
      switchMap((asrResponse) => {
   
        this.detectedText = asrResponse.transcription;
        
        if (!this.detectedText) {
          throw new Error("No speech detected in the audio.");
        }

        this.currentStep = 'Step 2/3: Translating Text...';
        return this.apiService.translateText(this.detectedText, this.targetLanguage);
      }),

      switchMap((translationResponse) => {
        let translatedText = '';
        if (this.targetLanguage === 'sa') {
          translatedText = translationResponse.translated_sanskrit || '';
        } else {
          translatedText = translationResponse.translated_hindi || '';
        }
        
        this.translatedText = translatedText;

        if (!translatedText) {
          throw new Error("Translation failed to produce output.");
        }

        this.currentStep = 'Step 3/3: Generating Speech...';
        return this.apiService.generateSpeech(translatedText, this.targetLanguage);
      })

    ).subscribe({
      next: (audioBlob: Blob) => {
        this.finalAudioUrl = URL.createObjectURL(audioBlob);
        this.isLoading.set(false);
        this.currentStep = 'Completed!';
        this.showSuccess("Translation Successful");
      },
      error: (err) => {
        console.error("Pipeline Failed", err);
        this.errorMessage = err.message || "An error occurred during processing.";
        this.isLoading.set(false);
        this.currentStep = 'Failed';
        this.showError(this.errorMessage);
      }
    });
  }

  cleanupAudio() {
    if (this.finalAudioUrl) {
      URL.revokeObjectURL(this.finalAudioUrl);
      this.finalAudioUrl = null;
    }
    this.detectedText = '';
    this.translatedText = '';
  }

  ngOnDestroy(): void {
    this.cleanupAudio();
  }
}