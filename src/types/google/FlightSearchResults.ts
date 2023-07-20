export default interface FlightSearchResult {
    identifier: string;
    coordinates: [number, number];
    city: string;
    country: string;
    listingPictureUrl: string;
    coverPictureUrl: string;
    flight: Flight;
}

export interface Flight {
    price: number;
    iata: string;
    airline: string;
    arrivalAirport: string;
    arrivalAirportIdentifier: string;
}

export interface FlightSearchParams {
    departureIdentifier: string;
    arrivalIdentifier?: string;
    departureDate?: string;
    arrivalDate?: string;
    stops?: Stops;
    duration?: number;
    roundtrip?: boolean;
    passengers?: {
        adults?: number;
        children?: number;
        infantsOnLap?: number;
        infantsInSeat?: number;
    }
}

export enum Stops {
    ANY,
    NONSTOP,
    ONE_OR_FEWER,
    TWO_OR_FEWER
}