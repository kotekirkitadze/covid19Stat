import { Component, Input, OnInit } from '@angular/core';
import { CountryData } from 'src/app/models/countryInfo';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  private _countriesInfo: CountryData[];

  @Input()
  set countriesInfo(value: CountryData[]) {
    this._countriesInfo = value;
    // console.log(value)
  };

  get countriesInfo() {
    return this._countriesInfo;
  }

  selectedCountry: CountryData;


  constructor() { }

  ngOnInit(): void {
    setTimeout(() => console.log(this.countriesInfo), 2000)
  }



  customers1: any[];

  customers2: any[];

  selectedCustomer1: any;

  selectedCustomer2: any;


}
