import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CountryInfoShellComponent } from './components/country-info-shell/country-info-shell.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { NotFoundComponent } from './shell/not-found/not-found.component';

const ROUTES = [
  {
    path: '',
    redirectTo: 'timeline',
    pathMatch: 'full',
  },
  {
    path: 'timeline',
    component: TimelineComponent,
  },
  {
    path: 'country-info',
    component: CountryInfoShellComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
