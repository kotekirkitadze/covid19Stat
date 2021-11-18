import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { LineBarData } from 'src/app/models/eCharts-model';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input()
  set lineBarData(value: LineBarData) {
    this.initChart(value?.structureData, value?.category, value?.legend)
  }

  constructor() { }

  ngOnInit(): void {

  }

  chartOption: EChartsOption;

  initChart(structureData: any[], categoryData: string[], legendData: string[]) {
    console.log(typeof structureData[0])
    if (legendData != null) {
      this.chartOption = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [...legendData]
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
          boundaryGap: false,
          data: [...categoryData]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          ...structureData
        ]
      };
    }
  }
}
