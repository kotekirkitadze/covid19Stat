import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
