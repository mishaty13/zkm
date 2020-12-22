import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Stop } from '../../data/stop.interface';

@Component({
  selector: 'app-stop-list',
  templateUrl: './stop-list.component.html',
  styleUrls: ['./stop-list.component.sass']
})
export class StopListComponent {

  @Input() stopList: Stop[] = null;
  @Input() errorMsg = null;
  @Input() stopListDate = null;
  @Output() emitStopToDepartures = new EventEmitter<number>(); 

  // Zmienne związane z filtrowaniem tablicy przystanków przez użytkownika.
  stopListFiltered: Stop[] = null;  // Przefiltrowana tablica przystanków.
  stopFilter: string = "";          // Klucz filtrowania, przypisany do inputa przez ngModel.
  sortAscendingByName: number = 1;  // Sortowanie przystanków po nazwie, 1: -rosnąco, -1: malejąco.
  sortAscendingByCity: number = 1;  // Sortowanie przystanków po mieście, 1: -rosnąco, -1: malejąco.

  constructor() {}

  stopsFilter() { // Funkcja filtrująca listę przystanków zawierających dane z input użytkownika.
    this.stopListFiltered = this.stopList.filter( item => (
      item.stopName.toLocaleLowerCase().includes(this.stopFilter.toLowerCase()) || 
      item.zoneName.toLocaleLowerCase().includes(this.stopFilter.toLowerCase()) ||
      item.stopCode.toLocaleLowerCase().includes(this.stopFilter.toLowerCase()) 
      )
    )}

  // Sortowanie po nazwach przystanków.
  changeSortByName(): void {  // Funkcja reagująca na naciśnięcie pola sortowania przez użytkownika.
    this.sortAscendingByName = -this.sortAscendingByName; // Zmiana flagi sortowania na przeciwną.
    if (this.stopFilter) this.sortStopsByName(this.stopListFiltered, this.sortAscendingByName); // Wybór czy funcja sortująca operuje na danych przefiltrowanych, czy pełnych.
    else this.sortStopsByName(this.stopList, this.sortAscendingByName);
  }

  sortStopsByName(stopList: Stop[], asc: number): Stop[] {
    return stopList.sort( (a, b) => { 
      return (a.stopName > b.stopName) ? asc : // asc to flaga sortowania, 1 dla rosnąco, -1 dla malejąco.
        (a.stopName < b.stopName) ? -asc : 
          (a.stopCode > b.stopCode) ? asc :
            (a.stopCode < b.stopCode) ? -asc : 0
    });
  }

  // Sortowanie po miastach.
  changeSortByCity(): void {  // Funkcja reagująca na naciśnięcie przez użytkownika pola sortowania.
    this.sortAscendingByCity = -this.sortAscendingByCity; // Zmiana flagi sortowania na przeciwną.
    if (this.stopFilter) this.sortStopsByCity(this.stopListFiltered, this.sortAscendingByCity);  // Wybór czy funcja sortująca operuje na danych przefiltrowanych, czy pełnych.
    else this.sortStopsByCity(this.stopList, this.sortAscendingByCity);
  }

  sortStopsByCity(stopList: Stop[], asc: number): Stop[] {
    return stopList.sort( (a, b) => {
      return (a.zoneName > b.zoneName) ? asc : // asc to flaga sortowania, 1 dla rosnąco, -1 dla malejąco.
        (a.zoneName < b.zoneName) ? -asc : 0
    });
  }

}
