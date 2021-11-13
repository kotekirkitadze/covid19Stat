import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { COUNTRY_API, TIMELINE_API } from './services/data-api.service';
import { NgxEchartsModule } from 'ngx-echarts';
import { TimelineComponent } from './components/timeline/timeline.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { NotFoundComponent } from './shell/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/material.module';
import { HeaderComponent } from './shell/header/header.component';
import { VisualizationCharComponentComponent } from './components/timeline/visualization-char-component/visualization-char-component.component';
import { CountryInfoShellComponent } from './components/country-info-shell/country-info-shell.component';
import { TableComponent } from './components/country-info-shell/table/table.component';
import { ListboxModule } from 'primeng/listbox';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    NotFoundComponent,
    HeaderComponent,
    VisualizationCharComponentComponent,
    CountryInfoShellComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    BrowserAnimationsModule,
    FormsModule,
    SelectButtonModule,
    CalendarModule,
    ListboxModule,
    TableModule,
    MaterialModule,
    AppRoutingModule,
    DropdownModule

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
