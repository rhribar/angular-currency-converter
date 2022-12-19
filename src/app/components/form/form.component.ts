import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Currencies } from './../../../model/types';
import { CurrenciesService } from './../../services/currencies.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  currencyConversionForm!: FormGroup;
  baseToCounter: any;
  currentDate = new Date();

  @Input() amount!: number;
  @Input() baseCurrency!: string;
  @Input() counterCurrency!: string;
  @Input() currencies!: Currencies[];

  @Output('currenciesSwapped') currenciesEmitter = new EventEmitter();
  @Output('formChanged') formEmitter = new EventEmitter();

  constructor(private currenciesService: CurrenciesService) { }
  
  ngOnInit() {
    this.currencyConversionForm = new FormGroup({
      amount: new FormControl(this.amount),
      baseCurrencyForm: new FormControl(this.baseCurrency),
      counterCurrencyForm: new FormControl(this.counterCurrency),
    })

    this.currencyConversionForm.valueChanges.subscribe((selectedValue: any) => {
      this.formEmitter.emit(selectedValue);
    })

    this.currenciesService.loadCurrencies(this.baseCurrency, this.counterCurrency)
      .subscribe((data) => {
        let rates = data.rates;
        
        let latestRate = Object.keys(rates).map((key) => rates[key as any][this.counterCurrency])[0];

        this.baseToCounter = latestRate;
    });
  }

  onCurrenciesSwapped() {
    this.currenciesEmitter.emit();
  }
}

