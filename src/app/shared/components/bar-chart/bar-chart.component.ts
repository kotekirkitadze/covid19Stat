import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { BarChartData } from 'src/app/models/eCharts-model';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @Input()
  set barCharData(value: BarChartData) {
    this.initCharBar(value?.title, value?.categories, value?.structureData)
  }

  constructor() { }

  ngOnInit(): void {
  }

  chartOption: EChartsOption;
  initCharBar(title: string, categories: string[], structure: any) {
    this.chartOption = {
      title: {
        text: `${title}'s statistics'`
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data: [...categories]
      },
      series: [
        ...structure
      ]
    };
  }

}
