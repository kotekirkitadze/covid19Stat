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

  private _date: Date;
  private chosenDate: string;


  handleDateFormat(value: Date) {
    if ((value.getMonth() + 1) < 10 && value.getDate() < 10) {
      this.chosenDate = `${value.getFullYear()}-0${value.getMonth() + 1}-0${value.getDate()}`;
    } else if ((value.getMonth() + 1) < 10 && value.getDate() > 10) {
      this.chosenDate = `${value.getFullYear()}-0${value.getMonth() + 1}-${value.getDate()}`;
    } else if ((value.getMonth() + 1) > 9 && value.getDate() < 10) {
      this.chosenDate = `${value.getFullYear()}-${value.getMonth() + 1}-0${value.getDate()}`;
    } else {
      this.chosenDate = `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
    }
  }

  // myToday = new Date();
  // today = this.myToday.getFullYear() + '-' + (this.myToday.getMonth() + 1) + '-' + this.myToday.getDate();

  set date(value: Date) {
    this.handleDateFormat(value);
    this.handleSelectedDay(this.chosenDate);
    this._date = value;
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


  initChart(prev: TimelineResultAPI, curr: TimelineResultAPI) {
    this.chartOption = {
      title: {
        text: 'Stacked Line'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Confirmed cases', 'Total Recovered', 'Total Death']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: ['00:00', '23:00']
      },
      yAxis: {
        type: 'value'
      },
      series: [

        {
          name: 'Confirmed cases',
          type: 'line',
          stack: 'Total',
          data: [prev.confirmed, curr.confirmed]
        },
        {
          name: 'Total Recovered',
          type: 'line',
          stack: 'Total',
          data: [prev.recovered, curr.recovered]
        },
        {
          name: 'Total Death',
          type: 'line',
          stack: 'Total',
          data: [prev.deaths, curr.deaths]
        },

      ]
    };


  }

}
