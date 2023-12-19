import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherComponent } from './weather/weather.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';

import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    CurrencyConverterComponent,
    WeatherComponent,
    ContactFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
