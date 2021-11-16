import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Country, CountryData, CountryDataAPI } from 'src/app/models/countryInfo';
import { DataApiService } from 'src/app/services/data-api.service';
import { mapCountryData, mapTimelineData, handleCountryMaping } from '../../shared/utils/mapping.fn';
import { handleDateFormat } from '../../shared/utils/handling.fn'
import { TimelineResult } from '../../models/timeline';

interface LineCHart {
  categoRies: string[],

}


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


  // "2021-11-02"
  // "2021-11-04"

  //2022-02-28
  //2021-12-27

  handleTransferData(dates: string[]) {
    // let startDate = dates[0].split('-');
    // let endDate = dates[1].split('-');
    // if (startDate[0] < endDate[0]){

    // }
    console.log(this.countryData.timeline);
    this.forTransfering = [];
    this.countryData.timeline.forEach(el => {
      if (el.date == dates[0] || el.date == dates[1]) {
        this.forTransfering.push(el)
      }
    })

    console.log(this.forTransfering);


  }


  countryData: CountryData;
  forTransfering: TimelineResult[] = [];

  set rangeDates(value: Date[]) {
    this._rangeDates = value;
    this.handleDataFormating(value);
    console.log(this.handledDates);
    this.handleTransferData(this.handledDates)
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
    this.http.getCountryDataByCode(value.code).pipe(
      map<CountryDataAPI, CountryData>(el =>
        this.handleSelectedCountryMapping(el)),
      map<CountryData, CountryData>(el => this.handleLastThreeMonthData(el))
    ).subscribe(el => this.countryData = el);

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
    console.log(typeof this.minDateValue.getFullYear())
    this.http.getCountryData().subscribe(
      (data: CountryDataAPI[]) => {
        this.countriesInfo = data.map(mapCountryData)
        this.countries = data.map(handleCountryMaping)
      }
    );
  }

}
