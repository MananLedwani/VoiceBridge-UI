import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TranslationRequest, TranslationResponse } from "../models/text-to-text";

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
}