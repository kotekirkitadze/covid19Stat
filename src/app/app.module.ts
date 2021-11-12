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
import { NotFoundComponent } from './shell/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/material.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Header } from 'primeng/api';
import { HeaderComponent } from './shell/header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    NotFoundComponent,
    HeaderComponent
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
    TableModule,
    MaterialModule,
    AppRoutingModule
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
