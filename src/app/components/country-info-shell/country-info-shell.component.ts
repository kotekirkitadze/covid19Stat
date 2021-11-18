import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Country, CountryData, CountryDataAPI } from 'src/app/models/countryInfo';
import { DataApiService } from 'src/app/services/data-api.service';
import { mapCountryData, handleCountryMaping } from '../../shared/utils/mapping.fn';
import { handleDateFormat } from '../../shared/utils/handling.fn'
import { TimelineResult } from '../../models/timeline';
import { BarChartData, LineBarData } from 'src/app/models/eCharts-model';
import { CountryInfoFacade } from './country-info.facade';

@Component({
  selector: 'app-country-info-shell',
  templateUrl: './country-info-shell.component.html',
  styleUrls: ['./country-info-shell.component.scss'],
  providers: [CountryInfoFacade]
})
export class CountryInfoShellComponent implements OnInit {
  isPopulated: boolean = false;
  echartsVisibility() {
    this.isPopulated = !this.isPopulated
  }

  private handledDates: string[] = [];

  countries: Country[];
  countriesInfo: CountryData[];
  countryInfo: CountryData;

  countryData: CountryData;
  forTransfering: TimelineResult[] = [];

  //data for eCharts
  lineBarData: LineBarData;
  barCharData: BarChartData;

  //range calendar variables
  private _rangeDates: Date[];
  minDateValue = new Date();
  maxDateValue = new Date();

  //getters
  get rangeDates() {
    return this._rangeDates;
  }

  get selectedCountry() {
    return this._selectedCountry;
  }

  constructor(private http: DataApiService,
    private countryInfoFacade: CountryInfoFacade) { }

  //setters
  set rangeDates(value: Date[]) {
    this._rangeDates = value;
    this.handleDataFormating(this.countryInfoFacade.getDaysArray(value[0], value[1]));
    this.handleTransferData()
    if (value[1] != null) {
      this.lineBarData = this.mapLineBarData(this.forTransfering.reverse());
      this.barCharData = this.mapCharBarData(this.forTransfering);
      this.isPopulated = true;
    }
  }

  _selectedCountry: Country;
  set selectedCountry(value) {
    if (this._selectedCountry) {
      this.echartsVisibility();
    }
    this.resetData();
    this._selectedCountry = value;
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

  mapLineBarData(data: TimelineResult[]): LineBarData {
    return this.countryInfoFacade.mapLineBarData(data)
  }

  mapCharBarData(data: TimelineResult[]): BarChartData {
    return this.countryInfoFacade.mapCharBarData(data, this._selectedCountry.name)
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

  resetData() {
    this._selectedCountry = null;
    this.countryData = null;
    this._rangeDates = [new Date(), new Date()];
    this.handledDates = [];
    this.minDateValue = new Date();
    this.maxDateValue = new Date();
    this.lineBarData = null;
    this.barCharData = null;
    this.handleLastThreeMonth();
  }

  handleLastThreeMonthData(d: CountryData) {
    return this.countryInfoFacade.handleLastThreeMonthData(d, this.minDateValue);
  }

  handleSelectedCountryMapping(el: CountryDataAPI) {
    return this.countryInfoFacade.handleSelectedCountryMapping(el, this.minDateValue);
  }

  handleTransferData() {
    // this.countryInfoFacade.handleTransferData(this.forTransfering, this.countryData, this.handledDates);
    this.forTransfering = [];
    this.countryData.timeline.forEach(el => {
      this.handledDates.forEach(d => {
        if (el.date == d) {
          this.forTransfering.push(el);
        }
      })
    })
  }

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
