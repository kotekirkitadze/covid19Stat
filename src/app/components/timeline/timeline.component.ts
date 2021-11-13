import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { map } from 'rxjs/operators';
import { TimelineResult, TimelineResultAPI } from 'src/app/models/timeline';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {


  handleDateFormat(value: Date) {
    if ((value.getMonth() + 1) < 10 && value.getDate() < 10) {
      return `${value.getFullYear()}-0${value.getMonth() + 1}-0${value.getDate()}`;
    } else if ((value.getMonth() + 1) < 10 && value.getDate() > 10) {
      return `${value.getFullYear()}-0${value.getMonth() + 1}-${value.getDate()}`;
    } else if ((value.getMonth() + 1) > 9 && value.getDate() < 10) {
      return `${value.getFullYear()}-${value.getMonth() + 1}-0${value.getDate()}`;
    } else {
      return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
    }
  }

  private chosenDate: string;
  set date(value: string) {
    this.chosenDate = value;
    this.handleSelectedDay(this.chosenDate);
  }



  get date() {
    return this.handleDateFormat(new Date());
  }



  handleSelectedDay(date: string) {
    this.selectedData = this.data.filter(el => {
      return el.date == date
    });
  }

  constructor(private apiService: DataApiService) { }

  chartOption: EChartsOption;
  cols: any;

  data: TimelineResult[];
  selectedData: TimelineResult[];

  mapData(data: TimelineResultAPI): TimelineResult {
    return {
      date: data.date,
      active_cases: data.active,
      today_death: data.new_death,
      today_confirmed: data.new_confirmed,
      today_recovered: data.new_recovered,
      totalConfirmed: data.confirmed,
      totalRecovered: data.recovered,
      totalDeaths: data.deaths
    }
  }


  ngOnInit() {
    this.apiService.getTimelineData().pipe(
      map(d => d.map(this.mapData))
    ).subscribe(data => {
      console.log(data)
      this.selectedData = [data[0]];
      this.data = data;
    });

    this.cols = [
      { field: 'code', header: 'Total Cases' },
      { field: 'name', header: 'Today Confirmed Cases' },
      { field: 'category', header: 'Total Death' },
      { field: 'quantity', header: 'Today Confirmed Death' },
      { field: 'quantity', header: 'Total Recovered' },
      { field: 'quantity', header: 'Today Confirmed Recovered' }
    ];
  }
}
