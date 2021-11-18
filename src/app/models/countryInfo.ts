import { TimelineResult, TimelineResultAPI } from "./timeline";

export type stOrNum = number | string

export interface CountryData {
  name: string;
  code: string;
  population: stOrNum;
  dateOfUpdates: Date;
  deathPercent: stOrNum;
  curedPercent: stOrNum;
  casesPerMillion: stOrNum;
  totalCases: stOrNum;
  currentDayCases: stOrNum;
  totalDeathCases: stOrNum;
  curerrentDayDeathCases: stOrNum;
  totalCuredCases: stOrNum;
  currentDayCuredCases: stOrNum;
  timeline?: TimelineResult[]
}


export interface DataCountryInfoAPI {
  data: CountryDataAPI[] | CountryDataAPI
}

export interface CountryDataAPI {
  name: string;
  code: string;
  population: number;
  updated_at: Date;
  today: {
    deaths: string;
    confirmed: 0;
  }

  latest_data: {
    deaths: number;
    confirmed: number;
    recovered: number;
    critical: number;
    calculated: {
      death_rate: number;
      recovery_rate: number;
      recovered_vs_death_ration: null;
      cases_per_million_population: number;
    }
  }
  timeline?: TimelineResultAPI[]

}


export interface Country {
  name: string,
  code: string
}
