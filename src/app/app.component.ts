import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './services/currency.service';
import * as enums from './constants/constants'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private currencyService: CurrencyService) {}
  title = 'angular-test-ioas';

  ngOnInit(): void {
    this.currencyService.getCurrencyExchange(enums.Currency.EUR).subscribe(res => {
      console.log(res)
    },
    err => {console.log(err)}, 
    () => {})
  }
}
