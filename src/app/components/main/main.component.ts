import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  amount1: number = 0;
  amount2: number = 0;
  currency1: string = 'UAH';
  currency2: string = 'USD';
  exchangeRates: any = {
    UAH: 1,
    USD: 0,
    EUR: 0,
  };

  currencies: string[] = ['UAH', 'USD', 'EUR'];

  convertCurrency1(): void {
    this.amount2 =
      this.amount1 *
      (this.exchangeRates[this.currency1] / this.exchangeRates[this.currency2]);
  }

  convertCurrency2(): void {
    this.amount1 =
      this.amount2 *
      (this.exchangeRates[this.currency2] / this.exchangeRates[this.currency1]);
  }

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.fetchCurrencyRates();
  }

  fetchCurrencyRates(): void {
    this.currencyService.getCurrencyRates().subscribe({
      next: (data: any) => {
        const uahRate: number = data.rates.UAH;
        this.exchangeRates.USD = parseFloat(
          ((1 / data.rates.USD) * uahRate).toFixed(2)
        );
        this.exchangeRates.EUR = parseFloat(
          ((1 / data.rates.EUR) * uahRate).toFixed(2)
        );
      },
      error: (error: any) => {
        console.log('Error fetching currency rates:', error);
      },
    });
  }
}
