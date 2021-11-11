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
  new_death: number;
  active: number;
};

export interface TimelineResult {
  // update_at: string;
  date: string;
  totalDeaths: number;
  totalConfirmed: number;
  totalRecovered: number;
  today_confirmed: number;
  today_recovered: number;
  today_death: number;
  active_cases: number;
}
