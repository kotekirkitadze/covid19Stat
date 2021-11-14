import { Component, OnInit } from '@angular/core';
import { Country, CountryData, CountryDataAPI } from 'src/app/models/countryInfo';
import { DataApiService } from 'src/app/services/data-api.service';

interface City {
  name: string,
  code: string
}


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
    console.log('sasa', value)
    this._selectedCountry = value;
  }

  get selectedCountry() {
    return this._selectedCountry;
  }

  constructor(private http: DataApiService) { }

  ngOnInit(): void {
    this.http.getCountryData().subscribe(
      data => {
        this.countriesInfo = data.map(this.mapCountry)
        console.log('sasa', this.countriesInfo)
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

  mapCountry(data: CountryDataAPI): CountryData {
    return {
      name: data.name,
      code: data.code,
      totalCases: data.latest_data.confirmed,
      totalCuredCases: data.latest_data.recovered,
      totalDeathCases: data.latest_data.deaths,
      population: data.population,
      dateOfUpdates: data.updated_at,
      curedPercent: data.latest_data.calculated.recovery_rate,
      casesPerMillion: data.latest_data.calculated.cases_per_million_population,
      deathPercent: data.latest_data.calculated.death_rate,
      curerrentDayDeathCases: data.today.deaths,
      currentDayCases: data.today.confirmed,
      currentDayCuredCases: null,
    }
  }
}
