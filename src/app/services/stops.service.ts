import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StopsList, Stop } from '../data/stop.interface';
import { DeparturesList } from '../data/departure.interface';

@Injectable({
  providedIn: 'root'
})
export class StopsService {

  // Url do danych przystanków.
  stopListUrl = "https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/4c4025f0-01bf-41f7-a39f-d156d201b82b/download/stops.json";
  // Url do aktualnych danych TRISTAR odjazdów z przystanku o Id dodawanym na końcu adresu.
  stopDeparturesUrl = "https://ckan2.multimediagdansk.pl/delays?stopId="
  stopList: StopsList = null; 

  constructor(private httpClient: HttpClient) {}

  //  Struktura danych zawiera listy przystanków przyporządkowane do dat, na kolejne 7 dni.
  //  Najświeższa (dziesiejsza data, lub wczorajsza dla wczesnych godzin nocnych) to pierwsza rekord w formacie yyyy-MM-dd.
  //  Dla tego prostego serwisu nie ma potrzeby wyboru daty obowiązywania - filtruje dane dla najmniejszej wartości klucza daty.
  //  Struktura wygląda następująco: 
  //  {  "yyy-MM-dd":  {
  //                    lastUpdate: "data ostatniej aktualizacji",  
  //                    stops:  { tablica obiektów przystanków opisanych interfejsem Stop }
  //  }}
  getStopList(): Observable<StopsList> {
    return this.httpClient.get(this.stopListUrl).pipe(
      map( data => {
          let keys = Object.keys(data).sort( (a, b) =>
            (a > b) ? 1 : (a < b) ? -1 : 0
          );
          let firstKey = keys.shift();
          let firstRecord = data[firstKey]; 
          // Przystanki zostaną przefiltrowane: usnięcie pustych rekordów, przystanków wirtualnych i zajezdni.
          let stopList: Stop[] = firstRecord.stops;
          stopList = stopList.filter( item => (
            item.stopName != null && 
            item.virtual == 0 &&
            item.nonpassenger == 0 &&
            item.depot == 0 &&
            item.zoneName != null
          ));
          return { lastUpdate: firstRecord.lastUpdate, stops: stopList };
      })
    );
  }

  //  Struktura danych zawiera datę ostaniej aktualizacji oraz tablicę obiektów odjazdów przyporządkowanych do przystanków.
  getStopsDeparturesById(id): Observable<DeparturesList>{
    return this.httpClient.get<DeparturesList>(this.stopDeparturesUrl + id).pipe(
      map( data => {
        data.delay.forEach( item => {
          if ( +item.routeId >= 401 && +item.routeId <= 499) {  //szukanie linii nocnych w formacie 4xx
            item.routeId = "N" + (+item.routeId - 400); //zamiana na format Nxx
          }
          return item;
        })
        return data;
      })
    )
  }

}
