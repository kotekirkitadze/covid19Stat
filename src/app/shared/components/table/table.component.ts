import { Component, Input, OnInit } from '@angular/core';
import { CountryData } from 'src/app/models/countryInfo';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() cointriesInfo: CountryData[]


  constructor() { }

  ngOnInit(): void {
  }


  customers1: any[];

  customers2: any[];

  selectedCustomer1: any;

  selectedCustomer2: any;


}
