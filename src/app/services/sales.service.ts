import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Sales } from "../models/sales.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SalesService {
    private readonly apiUrl = 'dummy-data/sales.json';

    constructor(private http: HttpClient) {}

    getSales(): Observable<Sales[]> {
        return this.http.get<Sales[]>(this.apiUrl);
    }
}