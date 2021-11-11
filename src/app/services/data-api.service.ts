import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataTimeline, TimelineResultAPI } from '../models/timeline';


export const TIMELINE_API = new InjectionToken<string>('timeline API');

@Injectable({ providedIn: 'root' })
export class DataApiService {
  constructor(
    @Inject(TIMELINE_API) private timeline_url: string,
    private http: HttpClient
  ) { }

  getTimelineData(): Observable<TimelineResultAPI[]> {
    return this.http.get<DataTimeline>(this.timeline_url).pipe(
      map(el => el.data)
    );
  }


}
