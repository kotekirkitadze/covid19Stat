import { NgModule } from '@angular/core';

//Materials
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';

//primeNg
import { ListboxModule } from 'primeng/listbox';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

//eCharts
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
    ListboxModule,
    DropdownModule,
    CalendarModule,
    SelectButtonModule,
    TableModule
  ]
}) export class ViewComponentsModule { }
