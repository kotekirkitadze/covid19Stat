import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { TimelineResult } from 'src/app/models/timeline';

@Component({
  selector: 'app-visualization-char-component',
  templateUrl: './visualization-char-component.component.html',
  styleUrls: ['./visualization-char-component.component.scss']
})
export class VisualizationCharComponentComponent implements OnInit {

  current: TimelineResult;

  @Input()
  set chosenData(value: TimelineResult) {
    this.initChart(value, this.categories);
    this.current = value;
  }
  @Input() categories: string[];

  constructor() { }

  ngOnInit(): void {
  }

  chartOption: EChartsOption;


  initChart(data: TimelineResult, categories: string[]) {
    this.chartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      xAxis: {
        type: 'category',
        data: [...categories]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [
            {
              value: data?.totalConfirmed,
              itemStyle: {
                color: '#fc8452'
              }
            },
            {
              value: data?.totalDeaths,
              itemStyle: {
                color: '#ee6666'
              }
            },
            {
              value: data?.totalRecovered,
              itemStyle: {
                color: '#3ba272'
              }
            }
          ],
          type: 'bar'
        }
      ]
    };

  }


}
