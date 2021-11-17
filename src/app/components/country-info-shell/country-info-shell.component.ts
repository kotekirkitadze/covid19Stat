import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Country, CountryData, CountryDataAPI } from 'src/app/models/countryInfo';
import { DataApiService } from 'src/app/services/data-api.service';
import { mapCountryData, mapTimelineData, handleCountryMaping } from '../../shared/utils/mapping.fn';
import { handleDateFormat } from '../../shared/utils/handling.fn'
import { TimelineResult } from '../../models/timeline';
import { LineBarData } from 'src/app/models/line-bar';

@Component({
  selector: 'app-country-info-shell',
  templateUrl: './country-info-shell.component.html',
  styleUrls: ['./country-info-shell.component.scss']
})
export class CountryInfoShellComponent implements OnInit {
  private _rangeDates: Date[];
  private handledDates: string[] = [];

  minDateValue = new Date();
  maxDateValue = new Date();

  lineBarData: LineBarData;

  getDaysArray(start, end) {
    for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  handleTransferData(dates: string[]) {
    this.forTransfering = [];
    this.countryData.timeline.forEach(el => {
      this.handledDates.forEach(d => {
        if (el.date == d) {
          this.forTransfering.push(el);
        }
      })
    })

  }

  countryData: CountryData;
  forTransfering: TimelineResult[] = [];

  set rangeDates(value: Date[]) {
    this._rangeDates = value;
    this.handleDataFormating(this.getDaysArray(value[0], value[1]));
    this.handleTransferData(this.handledDates)
    if (value[1] != null) {
      this.lineBarData = this.mapLineBarData(this.forTransfering.reverse());
    }
  }

  mapLineBarData(data: TimelineResult[]): LineBarData {
    let category = data.map(el => el.date)
    let legend = Object.keys(data[0])?.filter(el => el == 'totalDeaths'
      || el == 'totalConfirmed' || el == 'totalRecovered')
    console.log('qwqwq', this.buildStructure(data, legend))
    return {
      category: category,
      legend: legend,
      structureData: this.buildStructure(data, legend)
    }
  }


  buildStructure(d: TimelineResult[], legend: string[]) {
    return legend.map(el => {
      console.log('ssss', d[el])
      return {
        name: el,
        type: 'line',
        stack: 'Total',
        data: d.map(element => element[el])
      }
    })

  }

  get rangeDates() {
    return this._rangeDates;
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

  countries: Country[];
  countriesInfo: CountryData[];
  countryInfo: CountryData;

  _selectedCountry: Country;
  set selectedCountry(value) {
    this._selectedCountry = value;
    console.log('ccc', this._selectedCountry)
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

  resetData() {
    this._selectedCountry = null;
    this.countryData = null;
    this._rangeDates = [];
    this.handledDates = [];
    this.minDateValue = new Date();
    this.maxDateValue = new Date();
    this.lineBarData = null;
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

  get selectedCountry() {
    return this._selectedCountry;
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
