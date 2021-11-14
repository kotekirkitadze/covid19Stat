import { CountryData, CountryDataAPI } from "src/app/models/countryInfo";
import { TimelineResult, TimelineResultAPI } from "src/app/models/timeline";

export function mapTimelineData(data: TimelineResultAPI): TimelineResult {
  return {
    date: data.date,
    active_cases: data.active,
    today_death: data.new_death,
    today_confirmed: data.new_confirmed,
    today_recovered: data.new_recovered,
    totalConfirmed: data.confirmed,
    totalRecovered: data.recovered,
    totalDeaths: data.deaths
  }
}

export function mapCountryData(data: CountryDataAPI): CountryData {
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
