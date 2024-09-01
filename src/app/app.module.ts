import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';



import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AIComponent } from './ai/ai.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { StandingsComponent } from './standings/standings.component';
import { AgGridModule } from 'ag-grid-angular';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AIComponent,
    StandingsComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HighchartsChartModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
