import { Component, Input, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { ICurrencyResponse } from "src/app/interfaces/currency-response.interface";
import { ExchangeRateService } from "src/app/services/exchange-rate.service";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { IRateResponse } from "src/app/interfaces/rate-response.interface";
@Component({
  selector: "forex-calculator",
  templateUrl: "./forex-calculator.component.html",
  styleUrls: ["./forex-calculator.component.scss"],
})
export class ForexCalculatorComponent implements OnInit {
  @Input() title: string = "Forex Calculator";
  buyAmount: number = 0;
  sellAmount: number = 0;
  buyCurrency: string = "USD";
  sellCurrency: string = "EUR";
  currencies: ICurrencyResponse = {
    success: false,
    symbols: {},
  };
  sellAmountUpdate = new Subject<string>();
  buyAmountUpdate = new Subject<string>();
  rate!: IRateResponse;
  constructor(private exchangeRateService: ExchangeRateService) {
    this.sellAmountUpdate.pipe(debounceTime(400), distinctUntilChanged()).subscribe((value) => {
      this.buyAmount = 0;
      this.getRate(this.sellCurrency, this.buyCurrency, this.sellAmount, this.buyAmount);
    });
    this.buyAmountUpdate.pipe(debounceTime(400), distinctUntilChanged()).subscribe((value) => {
      this.sellAmount = 0;
      this.getRate(this.sellCurrency, this.buyCurrency, this.sellAmount, this.buyAmount);
    });
  }
  ngOnInit(): void {
    this.exchangeRateService.getCurrencies().subscribe((res: any) => {
      this.currencies = res;
    });
  }
  changeCcySelection(event: any) {
    this.getRate(this.sellCurrency, this.buyCurrency, this.sellAmount, this.buyAmount);
  }

  private getRate(baseSellCcy: string, buyCcy: string, sellAmount: number, buyAmount: number) {
    if (baseSellCcy && buyCcy && (sellAmount || buyAmount)) {
      this.exchangeRateService.getRate(baseSellCcy, [buyCcy]).subscribe(
        (res: any) => {
          this.rate = res;
          if (sellAmount) {
            console.log("s");
            this.buyAmount = Number((this.rate.rates[buyCcy] * sellAmount).toFixed(2));
          } else {
            this.sellAmount = Number((buyAmount * (1 / this.rate.rates[buyCcy])).toFixed(2));
          }
        },
        (err) => {
          alert(`code: ${err.error.error.code}\nmessage: ${err.error.error.message}`);
        }
      );
    }
  }
}
