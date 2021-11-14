import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Country, CountryData, CountryDataAPI } from 'src/app/models/countryInfo';
import { DataApiService } from 'src/app/services/data-api.service';
import { mapCountryData, mapTimelineData } from '../../shared/utils/mapping.fn';
import { handleDateFormat } from '../../shared/utils/handling.fn'

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


  handleLastThreeMonth() {
    this.minDateValue.setMonth(this.minDateValue.getMonth() - 3)
  }

  set rangeDates(value: Date[]) {
    this._rangeDates = value;
    this.handleDataFormating(value);
    console.log(value)
  }

  get rangeDates() {
    return this._rangeDates;
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
      this.handleSelectedCountryMapping(),
      this.handleLastThreeMonthData()
    ).subscribe(console.log)

  }

  handleLastThreeMonthData() {
    return map<CountryData, CountryData>(d => {
      return {
        ...d,
        timeline: d.timeline.filter(el => +el.date.split('-')[1] > this.minDateValue.getMonth() &&
          +el.date.split('-')[0] >= this.minDateValue.getFullYear())
      }
    })
  }

  handleSelectedCountryMapping() {
    return map<CountryDataAPI, CountryData>(el => {
      return {
        ...mapCountryData(el),
        timeline: el.timeline.map(mapTimelineData).filter(el => +el.date.split('-')[1] > this.minDateValue.getMonth() &&
          +el.date.split('-')[0] >= this.minDateValue.getFullYear())
      }
    })
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
        this.countries = data.map(this.handleCountryMaping)
      }
    );
  }

  handleCountryMaping(el: CountryDataAPI): Country {
    return {
      code: el.code,
      name: el.name
    }
  }
}
