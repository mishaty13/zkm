import { Component, OnInit } from '@angular/core';
import { StopsService } from '../services/stops.service';
import { Stop } from '../data/stop.interface';
import { Departure } from '../data/departure.interface';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-stops',
  templateUrl: './stops.component.html',
  styleUrls: ['./stops.component.sass']
})
// Komponent pobiera dane z serwisu i przekazuje je do swych children oraz komunikuje swoje children.
export class StopsComponent implements OnInit {

  stopList: Stop[] = null;      // Lista przystanków.
  stopListDate: string = "";    // Data aktualizacji listy przystanków.
  stopListErrorMsg = null;      // Wiadomość błędu w wypadku nieudanej próby pobrania listy przystanków.
  currentStopErrorMsg = null;   // Wiadomość błędu w wypadku nieudanej próby pobrania danych odjazdów.
  currentStopId: number = null; // Id przystanku wybranego do wyświetlenia odjazdów.
  currentStopName: string = ""; // Nazwa przystanku wybranego do wyświetlenia odjazdów.
  currentStopsDepartures: Departure[] = null; // Dane odjazdów dla wybranego przystanku.

  interval; // Zmienna interwału oddświeżania danych.
  refreshTimeInSeconds = 20; // Co ile sekund dane zostaną odświerzone. Słowo "sekund" ustawione na sztywno, więc nie zadziała dla np.: 2.

  constructor(private db: StopsService) {}

  ngOnInit(): void {
    // Pobranie listy przystanków.
    this.db.getStopList().pipe(first()).subscribe({
      next: (data) => { 
        if (data) {
          // Wstępne sortowanie po nazwach ulic.
          this.stopList = data.stops.sort( (a, b) => {
            return (a.stopName > b.stopName) ? 1 : 
              (a.stopName < b.stopName) ? -1 : 
                (a.stopCode > b.stopCode) ? 1 :
                  (a.stopCode < b.stopCode) ? -1 : 0
          });
          this.stopListDate = data.lastUpdate; // Zachowana też data aktualizacji informacji o przystankach.
        } 
        else this.stopListErrorMsg = { status: "", message: "Nie znaleziono danych." } // W przypadku braku danych błąd.
      },
      error: (err) => {this.stopListErrorMsg = err},
    });
  }

  // Odświerzanie tablicy. 
  startTimer() {
    clearInterval(this.interval); // W przypadku nowych danych oczekiwanie zaczyna się od początku.
    this.interval = setInterval(() => {
      this.showStop(this.currentStopId);
    }, this.refreshTimeInSeconds * 1000)
  }

  // Funkcja wywooływana po otrzymaniu Id przystanku, dla którego zostaną pobrane dane odjazdów.
  showStop(id){
    this.currentStopId = id;  // Otrzymane Id zachowane w komponencie, do przekazania dalej.
    let currentStopObject = this.stopList.filter( stop => (stop.stopId == id) ).shift(); // Szukany obiekt przystanku dla danego Id.
    this.currentStopName = currentStopObject.stopName + ` [${currentStopObject.stopCode}]`; // Nazwa przystanku w formacie: "Płocka [04]".
    this.db.getStopsDeparturesById(this.currentStopId).pipe(first()).subscribe({
      next: (data) => {
        if (data) {
          this.currentStopsDepartures = data.delay;
          this.startTimer();
        } else this.currentStopErrorMsg = { status: "", message: "Nie znaleziono danych." } // W przypadku braku danych błąd.
      },
      error: (err) => {this.currentStopErrorMsg = err}
    })
  }

}