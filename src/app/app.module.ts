import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { TIMELINE_API } from './services/data-api.service';
import { NgxEchartsModule } from 'ngx-echarts';
import { TimelineComponent } from './components/timeline/timeline.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent
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
    TableModule
  ],
  providers: [
    {
      provide: TIMELINE_API,
      useValue: environment.timelineApi
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
