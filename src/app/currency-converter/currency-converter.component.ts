import { Component, OnInit } from '@angular/core';
import * as enums from '../constants/constants'
import { CurrencyService } from '../services/currency.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  fromCurrencyAmount: number = 1;
  toCurrencyAmount?: number;
  fromCurrencies: enums.Currency[] = Object.values(enums.Currency);
  toCurrencies: enums.Currency[] = Object.values(enums.Currency);
  currencyConverterForm = new FormGroup({});

  amountControl =  new FormControl({ value: ''}, Validators.required );
  fromCurrencyControl = new FormControl({ value: '', disabled: false}, Validators.required );
  toCurrencyControl = new FormControl({ value: enums.Currency.RON, disabled: true}, Validators.required );
  convertedValue = 0;

  constructor(private converterService: CurrencyService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.currencyConverterForm = new FormGroup({
      amount: this.amountControl,
      fromCurrency : this.fromCurrencyControl,
      toCurrency : this.toCurrencyControl
    })
  }

swapCurrencies() {
  const currentFromCurrencyControl = this.currencyConverterForm.get('fromCurrency');
  const currentToCurrencyControl = this.currencyConverterForm.get('toCurrency');

  const currentFromCurrency = currentFromCurrencyControl?.value;
  const currentToCurrency = currentToCurrencyControl?.value;

  if (currentFromCurrency !== null && currentToCurrency !== null) {
    // Swap values
    currentFromCurrencyControl?.setValue(currentToCurrency);
    currentToCurrencyControl?.setValue(currentFromCurrency);

    // Toggle disabled state
    if (currentFromCurrencyControl?.disabled) {
      currentFromCurrencyControl?.enable({ onlySelf: true, emitEvent: false });
      currentToCurrencyControl?.disable({ onlySelf: true, emitEvent: false });
    } else {
      currentFromCurrencyControl?.disable({ onlySelf: true, emitEvent: false });
      currentToCurrencyControl?.enable({ onlySelf: true, emitEvent: false });
    }
  }
}

  onSubmit() {
    const amount = this.amountControl.value;
    const fromCurrency = this.fromCurrencyControl.value;
    const toCurrency = this.toCurrencyControl.value;
  
    if (fromCurrency === enums.Currency.RON && toCurrency === enums.Currency.RON) {
    // Both inputs are RON, directly assign the converted value
      this.convertedValue = amount;
    } else if(toCurrency === enums.Currency.RON)  {
        this.converterService.getCurrencyExchange(fromCurrency.toLowerCase()).subscribe((exchangeRate:number) => {
          this.convertedValue = (exchangeRate) * amount
        }, (error) => {
          console.error('Error fetching exchange rate:', error);
        })
    } else {
        this.converterService.getCurrencyExchange(toCurrency.toLowerCase()).subscribe(
          (exchangeRate: number) => {
            // If the original currency is not RON, calculate the inverse conversion
            const inverseExchangeRate = 1 / exchangeRate;
            this.convertedValue = inverseExchangeRate * amount;
          },
          (error) => {
            console.error('Error fetching exchange rate:', error);
          })
    }
    }
  
}
