// W tej formie dane są pobierane z serwera.
export interface DeparturesList{
    delay: Departure[],
    lastUpdate: string,
}

// Dane pojedyńczego przystanku. Nie wszystkie pola są używane, jednak nie nstępuje redukcja, może kiedyś się przydadzą. Opisane używane pola.
export interface Departure{
        id: string,
        delayInSeconds: number,
        estimatedTime: string,      // prognozowany przyjazd HH-MM
        headsign: string,           // kierunek - pole ograniczone do 17 znaków
        routeId: string,            // linia z zasobu lista linii. Linie nocne mają format 4xx zamiast Nxx, jest to poprawiane przy pobieraniu
        tripId: number,
        status: string,
        theoreticalTime: string,
        timestamp: string,
        trip: number,
        vehicleCode: number,        // numer boczny pojazdu
        vehicleId: number, 
}