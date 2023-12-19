import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {
  private bnr_url = 'http://www.infovalutar.ro/bnr/azi/';

  constructor(private http : HttpClient) { }

  getCurrencyExchange(currency:string) {
    return this.http.get<number>(this.bnr_url + currency);
  }
}
