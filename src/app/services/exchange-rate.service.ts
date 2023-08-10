import { ICurrencyResponse } from "./../interfaces/currency-response.interface";
import { Injectable } from "@angular/core";
import { environment as env } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class ExchangeRateService {
  private API_URL = env.API_URL;

  constructor(private http: HttpClient) {}

  public getCurrencies<ICurrencyResponse>(api = this.API_URL) {
    return this.http.get<ICurrencyResponse>(api + "currencies");
  }
  public getRate<IRateResponse>(baseCcy: string, symbols: string[], api = this.API_URL) {
    return this.http.get<IRateResponse>(api + `rates?base=${baseCcy}&symbols=${symbols.join(",")}`);
  }
}
