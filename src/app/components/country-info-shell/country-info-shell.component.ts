import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/countryInfo';
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
  selectedCountry: Country;

  constructor(private http: DataApiService) { }

  ngOnInit(): void {

    this.http.getCountryData().subscribe(
      data => this.countries = data
    );


  }

}
