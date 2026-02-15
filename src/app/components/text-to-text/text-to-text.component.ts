import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApisService } from '../../service/apis.service';
import { TranslationResponse } from '../../models/text-to-text';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-text-to-text',
  imports: [FormsModule, CommonModule, LoaderComponent],
  templateUrl: './text-to-text.component.html',
  styleUrl: './text-to-text.component.scss'
})
export class TextToTextComponent {
  inputText: string = '';
  targetLanguage: string = 'sa';
  translatedText: string = '';
  isLoading: WritableSignal<boolean> = signal(false);
  errorMessage: string = '';

  constructor(private apiService: ApisService) {}

  translate(): void {
    if (!this.inputText.trim()) {
      alert("Please enter some text first.");
      return;
    }

    this.isLoading.set(true);
    this.errorMessage = '';
    this.translatedText = '';

    this.apiService.translateText(this.inputText, this.targetLanguage).subscribe({
      next: (response: TranslationResponse) => {
        if (this.targetLanguage === 'sa' && response.translated_sanskrit) {
          this.translatedText = response.translated_sanskrit;
        } else if (this.targetLanguage === 'hi' && response.translated_hindi) {
          this.translatedText = response.translated_hindi;
        }
        this.isLoading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Translation failed', error);
        this.errorMessage = 'Translation failed. Is the backend server running?';
        this.isLoading.set(false);
      }
    });
  }
}