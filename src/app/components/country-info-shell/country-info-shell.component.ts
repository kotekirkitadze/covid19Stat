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

  set rangeDates(value: Date[]) {
    this._rangeDates = value;
    this.handleDataFormating(value);
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
      this.handleSelectedCountryMapping()
    ).subscribe(console.log)

  }

  handleSelectedCountryMapping() {
    return map<CountryDataAPI, CountryData>(el => {
      return {
        ...mapCountryData(el),
        timeline: el.timeline.map(mapTimelineData)
      }
    })
  }

  get selectedCountry() {
    return this._selectedCountry;
  }

  constructor(private http: DataApiService) { }

  ngOnInit(): void {
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
