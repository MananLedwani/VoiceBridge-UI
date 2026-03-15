import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApisService } from '../../service/apis.service';
import { TranslationResponse } from '../../models/text-to-text';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderComponent } from '../loader/loader.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-text-to-text',
  imports: [FormsModule, CommonModule, LoaderComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './text-to-text.component.html',
  styleUrl: './text-to-text.component.scss'
})
export class TextToTextComponent {
  inputText: string = '';
  targetLanguage: string = 'sa';
  translatedText: string = '';
  isLoading: WritableSignal<boolean> = signal(false);
  errorMessage: string = '';

  constructor(private apiService: ApisService, private messageService: MessageService) {}

  showSuccess(message: string): void{
     this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string): void{
     this.messageService.add({ severity: 'error', summary: 'Error', detail: message});
  }

  translate(): void {
    if (!this.inputText.trim()) {
      this.showError("Please enter some text first.");
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
        this.showSuccess("Translated Successfully")
      },
      error: (error: HttpErrorResponse) => {
        console.error('Translation failed', error);
        this.errorMessage = 'Translation failed. Unexpected error';
        this.isLoading.set(false);
        this.showError(this.errorMessage);
      }
    });
  }
}