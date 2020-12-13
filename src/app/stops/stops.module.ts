import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopsComponent } from './stops.component';
import { FormsModule } from '@angular/forms';
import { DeparturesAtStopComponent } from './departures-at-stop/departures-at-stop.component';
import { StopListComponent } from './stop-list/stop-list.component';

@NgModule({
  declarations: [
    StopsComponent,
    DeparturesAtStopComponent,
    StopListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    StopsComponent,
  ]
})
export class StopsModule { }
