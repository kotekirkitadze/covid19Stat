import { Component, OnInit } from '@angular/core';
import { Country, CountryData, CountryDataAPI } from 'src/app/models/countryInfo';
import { DataApiService } from 'src/app/services/data-api.service';
import { mapCountryData } from '../../shared/utils/mapping.fn';

@Component({
  selector: 'app-country-info-shell',
  templateUrl: './country-info-shell.component.html',
  styleUrls: ['./country-info-shell.component.scss']
})
export class CountryInfoShellComponent implements OnInit {
  countries: Country[];
  countriesInfo: CountryData[];

  _selectedCountry: Country;
  set selectedCountry(value) {
    this._selectedCountry = value;
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

    setTimeout(() => {
      this.http.getCountryDataByCode('GE').subscribe(console.log)
    }, 2000)
  }

  handleCountryMaping(el: CountryDataAPI): Country {
    return {
      code: el.code,
      name: el.name
    }
  }
}
