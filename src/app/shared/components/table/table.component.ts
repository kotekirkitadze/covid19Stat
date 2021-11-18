import { Component, Input, OnInit } from '@angular/core';
import { Country, CountryData } from 'src/app/models/countryInfo';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input()
  set selectedCountry(value: Country) {
    this._selectedCountry = this._countriesInfo.filter(el => el.code == value?.code ? el : null);
  };

  @Input()
  set countriesInfo(value: CountryData[]) {
    this._countriesInfo = value;
  };

  private _countriesInfo: CountryData[];
  private _selectedCountry: CountryData[] | null;

  get countriesInfo() {
    return this._countriesInfo;
  }

  constructor() { }

  ngOnInit(): void {
  }

  handleSearching() {
    return this._selectedCountry.length > 0 ? this._selectedCountry : this.countriesInfo;
  }

}
