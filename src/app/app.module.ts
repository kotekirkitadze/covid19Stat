import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { TIMELINE_API } from './services/data-api.service';
import { NgxEchartsModule } from 'ngx-echarts';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
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
