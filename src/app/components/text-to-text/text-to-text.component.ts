import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-to-text',
  imports: [FormsModule],
  templateUrl: './text-to-text.component.html',
  styleUrl: './text-to-text.component.scss'
})
export class TextToTextComponent {
  inputText: string = '';
  targetLanguage: string = '';
  translatedText: string = '';

  translate(): void{
    
  }

}
