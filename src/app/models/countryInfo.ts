export interface CountryData {
  population: number;
  dateOfUpdates: Date;
  deathPercent: number;
  curedPercent: number;
  casesPerMillion: number;
  totalCases: number;
  currentDayCases: number;
  totalDeathCases: number;
  curerrentDayDeathCases: string;
  totalCuredCases: number;
  currentDayCuredCases: number;
}


export interface DataCountryInfoAPI {
  data: CountryDataAPI[]
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

}


export interface Country {
  name: string,
  code: string
}
