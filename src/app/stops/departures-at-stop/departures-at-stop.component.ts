import { Component, Input } from '@angular/core';
import { Departure } from 'src/app/data/departure.interface';

@Component({
  selector: 'app-departures-at-stop',
  templateUrl: './departures-at-stop.component.html',
  styleUrls: ['./departures-at-stop.component.sass']
})
export class DeparturesAtStopComponent {

  // Dumb component - wyświetla dane przekazane od rodzica: tablicę z danymi odjazdów.
  @Input() currentStopName: string;
  @Input() currentStopsDepartures: Departure[]
  @Input() errorMsg: string;
  @Input() refreshTimeInSeconds: number;

  constructor() {}
}
