// W tej formie dane są pobierane z serwera.
export interface StopsList {
    stops: Stop[],
    lastUpdate: string,
}

// Dane pojedyńczego przystanku. Nie wszystkie pola są używane, jednak nie nstępuje redukcja, może kiedyś się przydadzą. Opisane używane pola.
export interface Stop {     
    stopId: number,             // id przystanku
    stopCode: string,           // kod przystanku w obrębie węzła
    stopName: string,           // nazwa przystanku
    stopShortName: number,      
    stopDesc: string,           
    subName?: string,           
    date: string,               
    stopLat: string,            
    stopLon: string,
    zoneId: number,             
    zoneName: string,           // miasto przystanku
    stopUrl: string,            
    locationType: string,
    parentStation: string,
    stopTimezone: string,
    wheelchairBoarding: string,
    virtual: 0 | 1,             // przystanek wirtualny
    nonpassenger: 0 | 1,        // przystanek niedostępny dla pasażerów
    depot: 0 | 1,               // zajezdnia
    ticketZoneBorder: 0 | 1,
    onDemand: 0 | 1,
    activationDate: string,
}

