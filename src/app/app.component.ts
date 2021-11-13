import { Component } from '@angular/core';
import { DataApiService } from './services/data-api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Covid Statistic';

  constructor(private http: DataApiService) {

  }

}
