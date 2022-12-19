import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from 'src/model/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  constructor(private http: HttpClient) { }

  loadCurrencies(baseCurrency: string, counterCurrency: string): Observable<Response> {
    return this.http
      .get<Response>(`https://api.exchangerate.host/timeseries?start_date=2022-01-01&end_date=2023-01-01&base=${baseCurrency}&symbols=${counterCurrency}`)
  }
}
