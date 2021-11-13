import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule
  ]
})
export class MaterialModule { }
