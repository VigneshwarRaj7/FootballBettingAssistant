import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';



import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AIComponent } from './ai/ai.component';
import { HighchartsChartModule } from 'highcharts-angular';
// import { ChatService } from './chat.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AIComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
