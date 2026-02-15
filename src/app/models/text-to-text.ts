export interface TranslationRequest {
  text: string;
}

export interface TranslationResponse {
  original: string;
  translated_sanskrit?: string; 
  translated_hindi?: string;   
}