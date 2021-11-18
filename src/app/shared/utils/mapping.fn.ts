import { CountryData, CountryDataAPI, Country } from "src/app/models/countryInfo";
import { TimelineResult, TimelineResultAPI } from "src/app/models/timeline";

export function mapTimelineData(data: TimelineResultAPI): TimelineResult {
  return {
    date: data.date || 'Data not available',
    active_cases: data.active || 'Data not available',
    today_death: data.new_deaths || 'Data not available',
    today_confirmed: data.new_confirmed || 'Data not available',
    today_recovered: data.new_recovered || 'Data not available',
    totalConfirmed: data.confirmed || 'Data not available',
    totalRecovered: data.recovered || 'Data not available',
    totalDeaths: data.deaths || 'Data not available'
  }
}

export function mapCountryData(data: CountryDataAPI): CountryData {
  return {
    name: data.name,
    code: data.code,
    totalCases: data.latest_data.confirmed || 'Data not available',
    totalCuredCases: data.latest_data.recovered || 'Data not available',
    totalDeathCases: data.latest_data.deaths || 'Data not available',
    population: data.population || 'Data not available',
    dateOfUpdates: data.updated_at,
    curedPercent: data.latest_data.calculated.recovery_rate || 'Data not available',
    casesPerMillion: data.latest_data.calculated.cases_per_million_population,
    deathPercent: data.latest_data.calculated.death_rate || 'Data not available',
    curerrentDayDeathCases: data.latest_data.deaths || 'Data not available',
    currentDayCases: data.latest_data.confirmed || 'Data not available',
    currentDayCuredCases: data.latest_data.recovered || 'Data not available',
  }
}

export function handleCountryMaping(el: CountryDataAPI): Country {
  return {
    code: el.code,
    name: el.name
  }
}
