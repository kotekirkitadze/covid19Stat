import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { map } from 'rxjs/operators';
import { TimelineResult } from 'src/app/models/timeline';
import { DataApiService } from 'src/app/services/data-api.service';
import { mapTimelineData } from '../../shared/utils/mapping.fn'
import { handleDateFormat } from '../../shared/utils/handling.fn'

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  chartOption: EChartsOption;
  cols: any;

  data: TimelineResult[];
  selectedData: TimelineResult[];

  categories: string[] = ["Total Cases", "Total Death", "Total Recovered"];

  private chosenDate: string;
  set date(value: string) {
    this.chosenDate = value;
    this.handleSelectedDay(this.chosenDate);
  }

  get date() {
    return handleDateFormat(new Date());
  }

  handleSelectedDay(date: string) {
    this.selectedData = this.data.filter(el => {
      return el.date == date
    });
  }

  constructor(private apiService: DataApiService) { }

  ngOnInit() {
    this.apiService.getTimelineData().pipe(
      map(d => d.map(mapTimelineData))
    ).subscribe(data => {
      this.selectedData = [data[0]];
      this.data = data;
    });
  }
}
