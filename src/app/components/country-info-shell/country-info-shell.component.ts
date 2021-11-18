import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Country, CountryData, CountryDataAPI } from 'src/app/models/countryInfo';
import { DataApiService } from 'src/app/services/data-api.service';
import { mapCountryData, mapTimelineData, handleCountryMaping } from '../../shared/utils/mapping.fn';
import { handleDateFormat } from '../../shared/utils/handling.fn'
import { TimelineResult } from '../../models/timeline';
import { BarChartData, LineBarData } from 'src/app/models/eCharts-model';

@Component({
  selector: 'app-country-info-shell',
  templateUrl: './country-info-shell.component.html',
  styleUrls: ['./country-info-shell.component.scss']
})
export class CountryInfoShellComponent implements OnInit {

  isPopulated: boolean = false;
  handlePop() {
    this.isPopulated = !this.isPopulated
  }

  private handledDates: string[] = [];

  countries: Country[];
  countriesInfo: CountryData[];
  countryInfo: CountryData;

  countryData: CountryData;
  forTransfering: TimelineResult[] = [];

  //data for eCharts
  lineBarData: LineBarData;
  barCharData: BarChartData;

  //range calendar variables
  private _rangeDates: Date[];
  minDateValue = new Date();
  maxDateValue = new Date();


  //getters
  get rangeDates() {
    return this._rangeDates;
  }

  get selectedCountry() {
    return this._selectedCountry;
  }

  getDaysArray(start, end) {
    for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  handleTransferData() {
    this.forTransfering = [];
    this.countryData.timeline.forEach(el => {
      this.handledDates.forEach(d => {
        if (el.date == d) {
          this.forTransfering.push(el);
        }
      })
    })
  }

  //setters
  set rangeDates(value: Date[]) {
    this._rangeDates = value;
    this.handleDataFormating(this.getDaysArray(value[0], value[1]));
    this.handleTransferData()
    if (value[1] != null) {
      this.lineBarData = this.mapLineBarData(this.forTransfering.reverse());
      this.barCharData = this.mapCharBarData(this.forTransfering);
    }
  }

  _selectedCountry: Country;
  set selectedCountry(value) {
    console.log('xxxx')
    this.resetData();
    this._selectedCountry = value;
    if (this._selectedCountry) {
      this.http.getCountryDataByCode(value.code).pipe(
        map<CountryDataAPI, CountryData>(el =>
          this.handleSelectedCountryMapping(el)),
        map<CountryData, CountryData>(el => this.handleLastThreeMonthData(el))
      ).subscribe(el => this.countryData = el);
    } else {
      this.resetData();
    }
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

  mapCharBarData(data: TimelineResult[]): BarChartData {
    let category = data.map(el => el.date)
    let legend = Object.keys(data[0])?.filter(el => el == 'today_confirmed'
      || el == 'today_recovered' || el == 'today_death');
    return {
      title: this._selectedCountry.name,
      categories: category,
      structureData: this.buildBarStructure(data, legend)
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


  handleLastThreeMonth() {
    this.minDateValue.setMonth(this.minDateValue.getMonth() - 3)
  }

  handleDataFormating(value: Date[]) {
    this.handledDates = [];
    if (this._rangeDates[1] !== null) {
      this.handledDates.push(...value.map(handleDateFormat))
    }
  }

  resetData() {
    this._selectedCountry = null;
    this.countryData = null;
    this._rangeDates = [new Date(), new Date()];
    this.handledDates = [];
    this.minDateValue = new Date();
    this.maxDateValue = new Date();
    this.lineBarData = null;
    this.barCharData = null;
    this.handleLastThreeMonth();
  }

  handleLastThreeMonthData(d: CountryData) {
    return {
      ...d,
      timeline: d.timeline.filter(el => +el.date.split('-')[1] > this.minDateValue.getMonth() &&
        +el.date.split('-')[0] >= this.minDateValue.getFullYear())
    }
  }

  handleSelectedCountryMapping(el: CountryDataAPI) {
    return {
      ...mapCountryData(el),
      timeline: el.timeline.map(mapTimelineData).filter(el => +el.date.split('-')[1] > this.minDateValue.getMonth() &&
        +el.date.split('-')[0] >= this.minDateValue.getFullYear())
    }
  }

  constructor(private http: DataApiService) { }

  ngOnInit(): void {
    this.handleLastThreeMonth();
    this.http.getCountryData().subscribe(
      (data: CountryDataAPI[]) => {
        this.countriesInfo = data.map(mapCountryData)
        this.countries = data.map(handleCountryMaping)
      }
    );
  }
}
