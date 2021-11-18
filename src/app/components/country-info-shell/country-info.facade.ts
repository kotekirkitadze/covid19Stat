import { Injectable } from '@angular/core';
import { CountryData, CountryDataAPI } from 'src/app/models/countryInfo';
import { BarChartData, LineBarData } from 'src/app/models/eCharts-model';
import { TimelineResult } from 'src/app/models/timeline';
import { mapCountryData, mapTimelineData } from '../../shared/utils/mapping.fn';

@Injectable()
export class CountryInfoFacade {
  constructor() { }

  buildLineCharStructure(d: TimelineResult[], legend: string[]) {
    return legend.map(el => {
      return {
        name: el,
        type: 'line',
        stack: 'Total',
        data: d.map(element => element[el])
      }
    })
  }

  mapLineBarData(data: TimelineResult[]): LineBarData {
    let category = data.map(el => el.date)
    let legend = Object.keys(data[0])?.filter(el => el == 'totalDeaths'
      || el == 'totalConfirmed' || el == 'totalRecovered')
    return {
      category: category,
      legend: legend,
      structureData: this.buildLineCharStructure(data, legend)
    }
  }

  buildBarStructure(data: TimelineResult[], legend: string[]) {
    return legend.map(el => {
      return {
        name: el,
        type: 'bar',
        data: data.map(d => d[el] != undefined ? d[el] : 0)
      }
    })
  }

  mapCharBarData(data: TimelineResult[], title: string): BarChartData {
    let category = data.map(el => el.date)
    let legend = Object.keys(data[0])?.filter(el => el == 'today_confirmed'
      || el == 'today_recovered' || el == 'today_death');
    return {
      title: title,
      categories: category,
      structureData: this.buildBarStructure(data, legend)
    }
  }

  //Dates
  getDaysArray(start, end) {
    for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  handleLastThreeMonthData(d: CountryData, minDateValue: Date) {
    return {
      ...d,
      timeline: d.timeline.filter(el => +el.date.split('-')[1] > minDateValue.getMonth() &&
        +el.date.split('-')[0] >= minDateValue.getFullYear())
    }
  }

  handleSelectedCountryMapping(el: CountryDataAPI, minDateValue: Date) {
    return {
      ...mapCountryData(el),
      timeline: el.timeline.map(mapTimelineData).filter(el => +el.date.split('-')[1] > minDateValue.getMonth() &&
        +el.date.split('-')[0] >= minDateValue.getFullYear())
    }
  }

  handleTransferData(forTransfering: TimelineResult[], countryData: CountryData, handledDates: string[]) {
    forTransfering = [];
    countryData.timeline.forEach(el => {
      handledDates.forEach(d => {
        if (el.date == d) {
          forTransfering.push(el);
        }
      })
    })
  }

}
