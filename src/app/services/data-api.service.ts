import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country, DataCountryInfoAPI } from '../models/countryInfo';
import { DataTimeline, TimelineResultAPI } from '../models/timeline';


export const TIMELINE_API = new InjectionToken<string>('timeline API');
export const COUNTRY_API = new InjectionToken<string>('country_api');

@Injectable({ providedIn: 'root' })
export class DataApiService {
  constructor(
    @Inject(TIMELINE_API) private timeline_url: string,
    @Inject(COUNTRY_API) private country_url: string,
    private http: HttpClient
  ) { }

  getTimelineData(): Observable<TimelineResultAPI[]> {
    return this.http.get<DataTimeline>(this.timeline_url).pipe(
      map(el => el.data)
    );
  }

  getCountryData(): Observable<Country[]> {
    return this.http.get<DataCountryInfoAPI>(this.country_url).pipe(
      map(el => el.data),
      map(d => d.map(el => {
        return { name: el.name, code: el.code }
      }))
    )
  }


}
