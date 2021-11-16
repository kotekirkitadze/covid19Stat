import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

interface Structure {
  name: string;
  type: string;
  stack: string;
  data: number[]
}


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }


  chartOption: EChartsOption;

  initChart(structureData: any[], categoryData: string[], legendData: string[]) {
    this.chartOption = {
      title: {
        text: 'Stacked Line'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
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

  buildStructure(d: Structure): Structure {
    return {
      name: d.name,
      type: d.type,
      stack: d.stack,
      data: d.data
    }
  }
}
