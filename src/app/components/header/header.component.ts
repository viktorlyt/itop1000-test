import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  usdRate!: number;
  eurRate!: number;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.fetchCurrencyRates();
  }

  fetchCurrencyRates(): void {
    this.currencyService.getCurrencyRates().subscribe({
      next: (data: any) => {
        const uahRate: number = data.rates.UAH; 
        this.usdRate = parseFloat(((1 / data.rates.USD) * uahRate).toFixed(2));
        this.eurRate = parseFloat(((1 / data.rates.EUR) * uahRate).toFixed(2));
      },
      error: (error: any) => {
        console.log('Error fetching currency rates:', error);
      },
    });
  }
}
