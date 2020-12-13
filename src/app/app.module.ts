import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
registerLocaleData(localePl);

import { HttpClientModule } from '@angular/common/http';
import { StopsModule } from './stops/stops.module';
import { AppComponent } from './app.component';

import 'bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    StopsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [ 
    { provide: LOCALE_ID, useValue: 'pl-PL' }, 
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
