import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { COUNTRY_API, TIMELINE_API } from './services/data-api.service';
import { NgxEchartsModule } from 'ngx-echarts';
import { TimelineComponent } from './components/timeline/timeline.component';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './shell/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { ViewComponentsModule } from './shared/material.module';
import { HeaderComponent } from './shell/header/header.component';
import { VisualizationCharComponentComponent } from './shared/components/bar-chartSimple-component/bar-chartSimple.component';
import { CountryInfoShellComponent } from './components/country-info-shell/country-info-shell.component';
import { TableComponent } from './shared/components/table/table.component';
import { LineChartComponent } from './shared/components/line-chart/line-chart.component'
import { BarChartComponent } from './shared/components/bar-chart/bar-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    NotFoundComponent,
    HeaderComponent,
    VisualizationCharComponentComponent,
    LineChartComponent,
    CountryInfoShellComponent,
    TableComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    BrowserAnimationsModule,
    FormsModule,
    ViewComponentsModule,
    AppRoutingModule,

  ],
  providers: [
    {
      provide: TIMELINE_API,
      useValue: environment.timelineApi
    },
    {
      provide: COUNTRY_API,
      useValue: environment.countriesApi
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
