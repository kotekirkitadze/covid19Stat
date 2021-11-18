import { stOrNum } from "./countryInfo";

export interface DataTimeline {
  data: TimelineResultAPI[]
}

export interface TimelineResultAPI {
  update_at: string;
  date: string;
  deaths: number;
  confirmed: number;
  recovered: number;
  new_confirmed: number;
  new_recovered: number;
  new_deaths: number;
  active: number;
};



export interface TimelineResult {
  // update_at: string;
  date: string;
  totalDeaths: stOrNum;
  totalConfirmed: stOrNum;
  totalRecovered: stOrNum;
  today_confirmed: stOrNum;
  today_recovered: stOrNum;
  today_death: stOrNum;
  active_cases: stOrNum;
}
