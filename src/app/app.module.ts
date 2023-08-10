import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskModule } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForexCalculatorComponent } from './components/forex-calculator/forex-calculator.component';

@NgModule({
  declarations: [AppComponent, ForexCalculatorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
