import { Component, OnInit } from '@angular/core';
import { DataApiService } from './services/data-api.service';
import { filter, map, tap } from 'rxjs/operators'
import { TimelineResultAPI } from './models/timeline';
import { EChartsOption, number } from 'echarts';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Covid Statistic';

  constructor(private apiService: DataApiService) { }

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


  chartOption: EChartsOption;
  currentDay: TimelineResultAPI;
  previousDat: TimelineResultAPI;

  ngOnInit() {
    this.apiService.getTimelineData().pipe(
      // map(el => el.map(element => (element.date)))
    ).subscribe(data => {
      this.initChart(data[1], data[0])
    })
  }
}
