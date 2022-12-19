import { Component } from '@angular/core';
import { CURRENCIES } from './constants/constants';
import { Currencies } from './../model/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  baseCurrency = 'USD';
  counterCurrency = 'EUR';
  amount = 100;
  currencies: Currencies[] = CURRENCIES;

  constructor() { }

  handleSwapCurrencies() {
    let base = this.baseCurrency;
    this.baseCurrency = this.counterCurrency;
    this.counterCurrency = base;
  }

  handleFormChanged(value: any) {
    this.amount = value.amount;
    this.baseCurrency = value.baseCurrencyForm;
    this.counterCurrency = value.counterCurrencyForm;
  }
}
