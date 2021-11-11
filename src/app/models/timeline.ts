interface TimelineResultAPI {
  update_at: string;
  date: Date;
  deaths: number;
  confirmed: number;
  recovered: number;
  new_confirmed: number;
  new_recovered: number;
  new_death: number;
  active: number;
}

interface TimelineResult {
  update_at: string;
  date: Date;
  totalDeaths: number;
  totalConfirmed: number;
  totalRecovered: number;
  new_confirmed: number;
  new_recovered: number;
  new_death: number;
  active: number;
}
