import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TranslationRequest, TranslationResponse } from "../models/text-to-text";
import { TranscriptionResponse } from "../models/speech-to-text";
import { TTSRequest } from "../models/text-to-speech";

@Injectable({
  providedIn: 'root'
})
export class ApisService {
  baseUrl = "http://127.0.0.1:8000"; 

  constructor(private http: HttpClient) {}

  translateText(text: string, targetLanguage: string): Observable<TranslationResponse> {
    const payload: TranslationRequest = { text: text };

    let endpoint = "";
    
    if (targetLanguage === 'sa') {
      endpoint = `${this.baseUrl}/text-to-text/sanskrit`;
    } else if (targetLanguage === 'hi') {
      endpoint = `${this.baseUrl}/text-to-text/hindi`;
    } else {
      throw new Error("Invalid target language selected");
    }

    return this.http.post<TranslationResponse>(endpoint, payload);
  }

  transcribeAudio(file: File, sourceLanguage: string): Observable<TranscriptionResponse> {
    const formData = new FormData();
    formData.append('file', file)

    let endpoint = "";
    if (sourceLanguage === 'hi') {
      endpoint = `${this.baseUrl}/speech-to-text/sanskrit`;
    } else if (sourceLanguage === 'sa') {
      endpoint = `${this.baseUrl}/speech-to-text/hindi`;
    } else {
      throw new Error("Invalid source language selected");
    }

    const extension = file.name.split('.').pop()?.toLowerCase() || 'wav';

    const params = new HttpParams().set('audio_format', extension);

    return this.http.post<TranscriptionResponse>(endpoint, formData, { params: params });
  }

  generateSpeech(text: string, language: string): Observable<Blob> {
    const payload: TTSRequest = { text: text };
    
    let endpoint = "";

    if (language === 'sa') {
      endpoint = `${this.baseUrl}/text-to-speech/sanskrit`;
    } else if (language === 'hi') {
      endpoint = `${this.baseUrl}/text-to-speech/hindi`;
    } else {
      throw new Error("Invalid language selected");
    }

    return this.http.post(endpoint, payload, { responseType: 'blob' });
  }
}